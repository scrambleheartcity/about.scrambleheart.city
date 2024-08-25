export function Background({ img }: { img: string | undefined }) {
  return (
    <div
      className="w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: img ? `url(${img})` : undefined,
      }}
    ></div>
  );
}
