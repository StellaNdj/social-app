import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PostContextProvider } from "./context/postContext.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
