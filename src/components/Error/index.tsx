import styles from "./Error.module.scss";

interface Props {
  message: string;
}

const Error: React.FunctionComponent<Props> = ({ message }: Props) => {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
};

export default Error;
