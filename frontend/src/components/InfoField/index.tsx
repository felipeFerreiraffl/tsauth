import type { HTMLInputTypeAttribute, JSX } from "react";
import styles from "./styles.module.css";
import icons from "../../utils/icons";

type InfoFieldProps = {
  icon: JSX.Element;
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  showEye?: boolean;
};

export default function InfoField(props: InfoFieldProps) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <span>{props.icon}</span>
        <label id={props.id}>{props.label}</label>
      </div>

      <div className={styles.inputContainer}>
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          value={props.value}
        />

        <span>{props.showEye && icons.invisible}</span>
      </div>
    </div>
  );
}
