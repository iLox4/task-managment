import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import TaskContextProvider from "./store/task-context";
import ModeContextProvider from "./store/mode-context";
import ModalFormContextProvider from "./store/modal-form-context";
import CategoryContextProvider from "./store/category-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModeContextProvider>
      <TaskContextProvider>
        <CategoryContextProvider>
          <ModalFormContextProvider>
            <App />
          </ModalFormContextProvider>
        </CategoryContextProvider>
      </TaskContextProvider>
    </ModeContextProvider>
  </React.StrictMode>
);
