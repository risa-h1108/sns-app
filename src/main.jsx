import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SessionProvider } from "./SessionProvider.jsx";

createRoot(document.getElementById("root")).render(
  //SessionProviderでAppを挟むことで、Appコンポーネント内で
  //SessionProviderのコンポーネント内（SessionProvider.jsxファイル参照）にある
  // props.childrenの情報（＝currentUser, setCurrentUser）を使えるようになる

  <StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </StrictMode>,
);
