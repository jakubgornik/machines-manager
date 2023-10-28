import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className="px-[2rem] sm:px-[4rem] md:px-[6rem] lg:mx-[10rem]">
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </div>
  );
};

export default Container;
