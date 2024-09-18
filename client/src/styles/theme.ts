import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Nunito", sans-serif',
    h1: {
      fontFamily: '"Dosis", sans-serif',
      fontWeight: 600,
      fontSize: 18,
    },

    h2: {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 600,
      fontSize: 18,
    },
    h3: {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 600,
      fontSize: 16,
    },
    body1: {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 600,
      fontSize: 14,
      color: "#7D7A7A",
    },
  },
});

export default theme;
