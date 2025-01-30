import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from './config/api';
import { CryptoState } from './CryptoContext';
import {
    Container,
    createTheme,
    LinearProgress,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ThemeProvider,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const { currency, symbol } = CryptoState();


    const [page, setPage] = useState(1);

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            mode: 'dark',
        },
    });

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    };


    const navigate = useNavigate();
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: 'Montserrat' }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField
                    label="Search for a cryptocurrency..."
                    variant="outlined"
                    style={{ marginBottom: 20, width: '100%' }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer >
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: 'gold' }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                                <TableRow>
                                    {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                                        <TableCell
                                            style={{
                                                color: 'black',
                                                fontWeight: '700',
                                                fontFamily: 'Montserrat',
                                            }}
                                            key={head}
                                            align={head === 'Coin' ? 'left' : 'right'}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {handleSearch()
                                    .slice((page - 1) * 10, page * 10 + 10)
                                    .map((rowCoin) => {
                                        const profit = rowCoin.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow onClick={() => navigate(`/coins/${rowCoin.id}`)} key={rowCoin.name} style={{

                                            }}>
                                                <TableCell component="th" scope='row' style={{ display: "flex", gap: 15 }}>
                                                    <img src={rowCoin?.image} alt={rowCoin.name} height='50' style={{ marginBottom: 10 }} />
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <span style={{ textTransform: "uppercase", fontSize: 22 }}>{rowCoin.symbol}</span>
                                                        <span style={{ color: "darkgrey", fontSize: 14 }}>{rowCoin.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align='right' style={{ color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500 }}>
                                                    {symbol}
                                                    {numberWithCommas(rowCoin.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {profit && "+"}{rowCoin.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {symbol}{" "} {numberWithCommas(rowCoin.market_cap.toString().slice(0, -6))}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>

                <Pagination count={(handleSearch()?.length / 10).toFixed(0)}
                    sx={{
                        padding: 2,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        "& .MuiPaginationItem-root": {
                            color: "gold",
                        },
                    }}
                    onChange={(_, pageNumber) => {
                        setPage(pageNumber);
                        window.scroll(0, 450);

                    }}
                />
            </Container>
        </ThemeProvider>
    );
};

export default CoinsTable;
