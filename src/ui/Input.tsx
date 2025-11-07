import classNames from "classnames";



export function Input({ className, ...rest }: React.ComponentPropsWithRef<"input">) {
  return (
    <input
      className={classNames(
        "block w-full p-2 rounded-lg border border-black",
        "read-only:bg-gray-100 outline-none",
        className
      )}
      {...rest}
    />
  );
}