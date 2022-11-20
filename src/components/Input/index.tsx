import styles from "./Input.module.scss";

interface Props {
  type: "text" | "number";
  value: string | number;
  placeholder: string;
  onChange: (val: any) => void;
}

const Input: React.FunctionComponent<Props> = ({
  value,
  type,
  placeholder,
  onChange,
}: Props) => {
  return (
    <input
      type={type}
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
