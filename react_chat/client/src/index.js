import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import customMuiTheme from "./customTheme";
import { AuthContextProvider } from "./context/AuthContext";
import { ConvContextProvider } from "./context/ConvContext";
import { ThemeProvider } from "@material-ui/core/styles";

const theme = customMuiTheme;

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConvContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ConvContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
