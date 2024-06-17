import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-md-editor/markdown.css";

import App from "~/App";
import Provider from "./store/provider/Provider";
import GlobalStyles from "~/components/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles>
      <Provider>
        <App />
      </Provider>
    </GlobalStyles>
  </React.StrictMode>
);
