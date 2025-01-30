export function AnimationDots() {
  return (
    <div className="flex gap-1">
      <span className="h-[7px] w-[7px] bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="h-[7px] w-[7px] bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="h-[7px] w-[7px] bg-black rounded-full animate-bounce" />
    </div>
  );
}
