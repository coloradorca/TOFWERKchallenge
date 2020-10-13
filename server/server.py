import math
import random
import socket
import threading
import time

from flask import Flask
from flask_socketio import SocketIO


random.seed(a=100)
socketio = SocketIO()
concentration_thread = None
thread_lock = threading.Lock()
STEP_SIZE = 10
longitude = 0
latitude = 0

def generate_data():
    global longitude, latitude

    while True:
        longitude += STEP_SIZE
        latitude = math.sin((longitude * math.pi) / 90) * 40
        if longitude > 360:
            longitude, latitude = 0, 0
        socketio.emit('data', {
            'time': time.time_ns() // 1000000,
            'Benzene': random.random() + 1.0,
            'Acetone': random.random(),
            'latitude': latitude,
            'longitude': longitude,
        })
        socketio.sleep(1)


@socketio.on('connect')
def on_connect():
    global concentration_thread, thread_lock

    with thread_lock:
        if concentration_thread is None:
            concentration_thread = socketio.start_background_task(generate_data)


if __name__ == '__main__':
    app = Flask(__name__)
    socketio.init_app(app, cors_allowed_origins='*', async_mode='eventlet')
    socketio.run(app, host='127.0.0.1', port=5000)
