import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className="w-full  px-[2rem] sm:px-[3rem] md:px-[6rem] lg:px-[8rem]">
      <div className="mx-auto  w-full max-w-[2880px]">{children}</div>
    </div>
  );
};

export default Container;
