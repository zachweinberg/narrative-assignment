import Header from "../Header";
import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className={styles.layout}>{children}</main>
    </>
  );
};

export default Layout;
