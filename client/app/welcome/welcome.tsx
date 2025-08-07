import { Board } from "../board/board";

export function Welcome() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">Battle Ship Game</h1>

      <div className="w-full flex flex-row gap-12 justify-center">
        <Board />
        <Board />
      </div>
    </>
  );
}
