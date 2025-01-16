import { FC } from "react";
import styles from "./XMixDrix.module.css";

export const XIcon: FC = () => (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div style={{ width: "75%", height: "75%" }}>
        <svg viewBox='0 0 24 24' style={{ width: "100%", height: "100%" }}>
          <path d='M18 6L6 18M6 6l12 12' stroke='#FF6B6B' strokeWidth='3' strokeLinecap='round' className={styles.xIcon} />
        </svg>
      </div>
    </div>
  </div>
);

export const OIcon: FC = () => (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div style={{ width: "75%", height: "75%" }}>
        <svg viewBox='0 0 24 24' style={{ width: "100%", height: "100%" }}>
          <circle cx='12' cy='12' r='8' fill='none' stroke='#4ECDC4' strokeWidth='3' className={styles.oIcon} />
        </svg>
      </div>
    </div>
  </div>
);
