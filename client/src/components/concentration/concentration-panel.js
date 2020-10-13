import React from "react";

import { Panel } from "../panel";
import { ConcentrationToolbar } from "./concentration-toolbar";
import { ConcentrationChart } from "./concentration-chart";
import { ConcentrationMap } from "./concentration-map";
import styles from "./index.module.scss";

export function ConcentrationPanel() {
  return (
    <>
      <Panel title="CONCENTRATION TIME-SERIES" showFavorited={false}>
        <ConcentrationToolbar />
        <div className={styles["concentration-chart-container"]}>
          <ConcentrationChart />
        </div>
      </Panel>
      <Panel title="CONCENTRATION MAP" showFavorited={false}>
        <ConcentrationToolbar />
        <div className={styles["concentration-chart-container"]}>
          <ConcentrationMap />
        </div>
      </Panel>
    </>
  );
}
