import { createTheme } from '@mui/material';
import { ptBR } from '@mui/material/locale';

export const Theme = createTheme(
    {
        palette: {
            primary: {
                main: '#202328'
            },

            secondary: {
                main: '#673ab7'
            },

            error: {
                main: '#b00020'
            },

            warning: {
                main: '#f4511e'
            },

            info: {
                main: '#607d8b'
            },

            success: {
                main: '#00897b'
            },
        },
    },
    ptBR
);