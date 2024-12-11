import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00A44F",
    },
    secondary: {
      main: "#f5f5f5",
    },
    warning: {
      main: "#60AF46",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
});
