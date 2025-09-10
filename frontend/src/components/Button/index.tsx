import type { ReactElement } from "react";
import styles from "./styles.module.css";

type ButtonProps = {
  label: string;
  color: string;
  border?: string;
  type?: "submit";
  marginTop?: number;
  onClick?: any;
  disabled?: boolean;
};

export default function Button(
  props: ButtonProps
): ReactElement<HTMLButtonElement> {
  return (
    <button
      className={styles.btn}
      type={props.type}
      style={{
        backgroundColor: props.color,
        color:
          props.color === "none"
            ? "var(--color-primary-main)"
            : "var(--color-neutral-white)",
        border: props.border,
        marginTop: props.marginTop,
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
}
