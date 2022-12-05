import React, { PropsWithChildren } from "react";

import styles from "./Field.module.css";

function Field({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Field;
