import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

const Button = ({ children, fullWidth, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};

export default Button;
