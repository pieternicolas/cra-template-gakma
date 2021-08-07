import { ImgHTMLAttributes } from 'react';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {};

const Image = ({ children, ...props }: ImageProps) => {
  return (
    <img alt="" {...props}>
      {children}
    </img>
  );
};

export default Image;
