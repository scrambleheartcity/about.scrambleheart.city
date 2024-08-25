import React from "react";

export function Background({ img, children }: { img: string | undefined } & React.PropsWithChildren) {
  return (
    <div
      className="min-h-screen w-full h-full bg-cover bg-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: img ? `url(${img})` : undefined,
      }}
    >{children}</div>
  );
}
