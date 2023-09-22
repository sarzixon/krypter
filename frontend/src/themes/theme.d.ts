import { Theme, ThemeOptions } from '@mui/material/styles';
import {Palette} from "@mui/material";
import {blueGrey, grey, indigo, teal} from "@mui/material/colors";
// import {Typography} from "@mui/material/styles/createTypography";

type testPalette = {
    primary: {
        main: indigo["700"]
    },
    secondary: {
        main: teal["700"]
    },
    background: {
        default: blueGrey["50"]
    },
    text: {
        primary: grey["900"]
    }
}

declare module '@mui/material/styles' {
    interface CustomTheme extends Theme {
        palette: Palette
    }
    // allow configuration using `createTheme`
    interface CustomThemeOptions extends ThemeOptions {
        palette?: testPalette,
        typography?: { fontFamily: string }
        shape?: {
            borderRadius: number
        }
    }
    export function createTheme(options?: CustomThemeOptions): CustomTheme;
}