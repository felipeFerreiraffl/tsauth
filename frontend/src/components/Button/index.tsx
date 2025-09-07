import type { ReactElement } from "react";
import styles from "./styles.module.css";

type ButtonProps = {
  label: string;
  color: string;
  border?: string;
  onClick: () => void;
};

export default function Button(
  props: ButtonProps
): ReactElement<HTMLButtonElement> {
  return (
    <button
      className={styles.btn}
      style={{
        backgroundColor: props.color,
        color:
          props.color === "none"
            ? "var(--color-primary-main)"
            : "var(--color-neutral-white)",
        border: props.border,
      }}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
