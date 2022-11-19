import styles from "./Loader.module.scss";

const Loader: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
