import React from "react";
import Image from "next/image";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={"/loader.svg"} alt="loading" width={100} height={100} />
    </div>
  );
};
