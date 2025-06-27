import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5D87FF',
            contrastText: '#fff',
        },
        secondary: {
            main: '#49BEFF',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#2A3547',
            secondary: '#5A6A85',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: '#2A3547',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(93, 135, 255, 0.08)',
                    },
                },
            },
        },
    },
});

export default theme;