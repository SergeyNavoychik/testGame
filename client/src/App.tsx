import React from "react";
import DuckHunter from "./components/DuckHunter";
import { SocketProvider } from "./context/socket";

function App() {
  return (
    <SocketProvider>
      <DuckHunter />
    </SocketProvider>
  );
}

export default App;
