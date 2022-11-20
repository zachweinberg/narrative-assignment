import cn from "classnames";
import styles from "./Button.module.scss";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FunctionComponent<Props> = ({
  children,
  onClick,
  className,
}: Props) => {
  return (
    <button className={cn([styles.button, className])} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
