import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PostContextProvider } from "./context/postContext.tsx";

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <PostContextProvider>
      <App />
    </PostContextProvider>
  </React.StrictMode>,
)
