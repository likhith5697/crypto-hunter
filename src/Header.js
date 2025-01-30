import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { CryptoState } from './CryptoContext';

const Header = () => {

    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#fff",
            },
            background: {
                default: "#121212",
            },
        },
    });


    const { currency, setCurrency } = CryptoState();
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate("/")}
                            variant="h6"
                            sx={{
                                flex: 1,
                                color: "gold",
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: "bold",
                                cursor: "pointer",
                                textAlign: "center",
                            }}

                        >
                            Crypto Hunter
                        </Typography>

                        <Select
                            defaultValue="USD"
                            sx={{
                                width: 100,
                                height: 40,
                                marginLeft: 2,
                                backgroundColor: "#fff",
                                color: "#000",
                                borderRadius: 1,
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="INR">INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>

    );
};

export default Header;
