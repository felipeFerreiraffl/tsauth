import styles from "./styles.module.css";
import IcnPhoneCall from "../../../assets/svgs/icons/phone-call.svg?react";
import images from "../../../utils/images";

type HomeIllustrationProps = {
  message: string;
};

export default function HomeIllustration(props: HomeIllustrationProps) {
  return (
    <div className={styles.container}>
      <div className={styles.phone}>
        <span>
          <IcnPhoneCall />
        </span>
        <p>+94 0116 789 754</p>
      </div>
      <img src={images.home} alt="Home illustration" />
      <div className={styles.textContainer}>
        <h2>{props.message}</h2>
        <p>TsAuth is simply</p>
      </div>
    </div>
  );
}
