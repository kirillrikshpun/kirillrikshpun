import { createMuiTheme } from "@material-ui/core/styles";

const customMuiTheme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: "2rem",
      },

      h2: {
        fontSize: "0.75rem",
      },

      h3: {
        fontSize: "0.75rem",
      },
    },
  },
});

export default customMuiTheme;
