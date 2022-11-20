import styles from "./Heading.module.scss";

interface Props {
  text: string;
}

const Heading: React.FunctionComponent<Props> = ({ text }: Props) => {
  return <h1 className={styles.heading}>{text}</h1>;
};

export default Heading;
