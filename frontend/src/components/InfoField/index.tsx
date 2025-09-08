import type { JSX } from "react";
import styles from "./styles.module.css";

type InfoFieldProps = {
  icon: JSX.Element;
  id: string;
  label: string;
  type: string;
  value?: string;
};

export default function InfoField(props: InfoFieldProps) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <span>{props.icon}</span>
        <label id={props.id}>{props.label}</label>
      </div>

      <input type={props.type} name={props.id} id={props.id} />
    </div>
  );
}
