import { useState, createContext, ReactElement } from "react";

type Mode = "today" | "all";
export type ModeContext = { mode: Mode; toggleMode: () => void };

export const ModeContext = createContext<ModeContext>({
  mode: "all",
  toggleMode: () => {},
});

export default function ModeContextProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [taskMode, setTaskMode] = useState<Mode>("all");

  const handleChangeMode = () => {
    setTaskMode((prevMode) => (prevMode === "all" ? "today" : "all"));
  };

  const ctxValue: ModeContext = {
    mode: taskMode,
    toggleMode: handleChangeMode,
  };

  return (
    <ModeContext.Provider value={ctxValue}>{children}</ModeContext.Provider>
  );
}
