// components/FramerBackground.tsx
import styles from "./framer.module.css";

export default function FramerBackground() {
  return (
   <div className={styles.container}>
      <div className={styles.layer1}>
        <div className={styles.imageMask}></div>
        <div className={styles.patternBg}></div>
      </div>
    </div>
  );
}
