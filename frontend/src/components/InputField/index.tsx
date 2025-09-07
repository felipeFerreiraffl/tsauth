import type { JSX } from "react";
import styles from "./styles.module.css";

type InputFieldProps = {
  id: string;
  label: string;
  icon: JSX.Element;
  placeholder: string;
  inputType: string;
  showEye?: JSX.Element;
};

export default function InputField(props: InputFieldProps) {
  return (
    <div className={styles.container}>
      <label id={props.id}>{props.label}</label>
      <div className={styles.inputContainer}>
        <span>{props.icon}</span>
        <input
          id={props.id}
          name={props.id}
          type={props.inputType}
          placeholder={props.placeholder}
        />
        <button className={styles.eye}>
          {props.inputType === "password" && props.showEye}
        </button>
      </div>
    </div>
  );
}
