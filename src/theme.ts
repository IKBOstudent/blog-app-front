import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#7bbabd",
        },
        secondary: {
            main: "#646464",
        },
    },
    typography: {
        button: {
            textTransform: "none",
            fontWeight: 400,
        },
    },
});
