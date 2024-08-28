import { FaDiceOne } from "react-icons/fa";

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-8 shadow-sm">
        <h1 className="text-center text-5xl font-semibold leading-12 text-ellipsis overflow-hidden leading-normal">
          SWARMS Experiment #1
        </h1>
        <FaDiceOne className="h-8 w-8"/>
      </div>
    </div>
  );
}
