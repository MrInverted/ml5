import classNames from "classnames";

interface IProps extends React.ComponentPropsWithRef<"button"> {
  variant: "red" | "blue"
}

export function Button({ variant, className, children, ...rest }: IProps) {
  return (
    <button className={classNames(
      "inline-flex justify-center items-center px-5 py-2 rounded-lg",
      "disabled:opacity-30 disabled:cursor-auto!",
      (variant === "blue" && "bg-blue-700 text-white"),
      (variant === "red" && "bg-red-700 text-white"),
      className
    )} {...rest}>
      {children}
    </button>
  );
}
