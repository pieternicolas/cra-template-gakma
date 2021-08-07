import { HTMLAttributes } from 'react';

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: 'heading' | 'paragraph';
  bold?: boolean;
  textCutoff?: boolean;
};

const Text = ({ children, as, bold, ...props }: TextProps) => {
  if (as === 'heading') {
    return (
      <h3 {...props}>{bold ? <strong>{children}</strong> : { children }}</h3>
    );
  }

  return <p {...props}>{bold ? <strong>{children}</strong> : { children }}</p>;
};

export default Text;
