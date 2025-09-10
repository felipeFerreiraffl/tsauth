import type { HTMLInputTypeAttribute, JSX } from "react";
import styles from "./styles.module.css";
import icons from "../../utils/icons";

type InfoFieldProps = {
  icon: JSX.Element;
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  showEye?: boolean;
  readonly?: boolean;
  minLength?: number;
};

export default function InfoField(props: InfoFieldProps) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <span>{props.icon}</span>
        <label htmlFor={props.id}>{props.label}</label>
      </div>

      <div className={styles.inputContainer}>
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          minLength={props.minLength}
          readOnly={props.readonly}
        />

        <span>{props.showEye && icons.invisible}</span>
      </div>
    </div>
  );
}
