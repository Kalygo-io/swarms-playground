import { FaDiceTwo } from "react-icons/fa6";

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4 text-white">
      <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-sm">
        <h1 className="text-gray-200 text-center text-5xl font-semibold leading-12 text-ellipsis overflow-hidden leading-normal">
          SPREADSHEET TOOL
        </h1>
        <FaDiceTwo className="h-8 w-8 text-red-800" />
      </div>
    </div>
  );
}
