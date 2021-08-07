import { HTMLAttributes } from 'react';

export type DivProps = HTMLAttributes<HTMLDivElement> & {};

const Div = ({ children, ...props }: DivProps) => {
  return <div {...props}>{children}</div>;
};

export default Div;
