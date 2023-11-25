import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FeFeFe',
            contrastText: '#000000'
        },
        background: {
            default: '#000000',
        },
        action: {
            selectedOpacity: .95
        }
    },
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: "#336600",
                        backgroundColor: '#8BC34A'
                    },
                    "&.Mui-selected: hover": {
                        color: '#8BC34A',
                        backgroundColor: "#336600"
                    },
                    "&:hover": {
                        color: '#01579B',
                        backgroundColor: "#D6EAF8"
                    }

                }
            }
        }
    }
});
