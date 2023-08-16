import {createTheme, responsiveFontSizes } from "@mui/material";
import {blueGrey, grey, indigo, teal} from "@mui/material/colors";

export const theme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main : indigo.A700
        },
        secondary: {
            main: teal.A700
        },
        background: {
            default: blueGrey["50"]
        },
        text: {
            primary: grey["900"]
        }
    },
    typography: {
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
    },
    shape: {
        borderRadius: 6
    }
}));