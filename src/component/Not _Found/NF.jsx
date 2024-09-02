// import React from 'react'
import nfmages from "../../assets/img/images/error.svg";

export default function NF() {
  return (
    <>
      {" "}
      <div className="my-[10vh] bg-cyan-950 flex  flex-col items-center justify-center relative w-full h-full">
        <img className=" " src={nfmages} alt="404" />
      </div>
    </>
  );
}
