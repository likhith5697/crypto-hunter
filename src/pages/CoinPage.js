import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import CoinInfo from '../CoinInfo';
import { LinearProgress, Typography, useTheme, Box } from '@mui/material';
import { numberWithCommas } from '../Carousel';

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState();
    const theme = useTheme(); // Added theme hook

    const fetchCoin = async () => {
        try {
            const { data } = await axios.get(SingleCoin(id));
            setCoin(data);
        } catch (error) {
            console.error("Error fetching coin data:", error);
        }
    };

    useEffect(() => {
        fetchCoin();
    }, [currency]);
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 25 }}>
            {/* Sidebar Section */}
            <div
                style={{
                    width: '30%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRight: '2px solid grey',
                    paddingRight: 20,
                }}
            >
                {/* Coin Image */}
                <img
                    src={coin?.image?.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />

                {/* Coin Description */}
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: 10,
                        fontFamily: 'Montserrat',
                        textAlign: 'justify',
                    }}
                >
                    {coin?.description?.en?.split('. ')[0] || 'No description available.'}
                </Typography>

                <Box
                    sx={{
                        alignSelf: "start",
                        padding: 2,
                        width: "100%",
                        [theme.breakpoints.down("md")]: {
                            display: "flex",
                            justifyContent: "space-between",
                        },
                        [theme.breakpoints.down("sm")]: {
                            flexDirection: "column",
                            alignItems: "center",
                        },
                        [theme.breakpoints.down("xs")]: {
                            alignItems: "start",
                        },
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 0.5 }}>
                        <Typography variant='h5' sx={{ fontFamily: "Montserrat", fontWeight: 'bold' }}>
                            Rank:
                        </Typography>
                        <Typography variant='h5' sx={{ fontFamily: "Montserrat", marginLeft: 2 }}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 0.5 }}>
                        <Typography variant='h5' sx={{ fontFamily: "Montserrat", fontWeight: 'bold' }}>
                            Current price:
                        </Typography>
                        <Typography variant='h5' sx={{ fontFamily: "Montserrat", marginLeft: 2 }}>
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 1 }}>
                        <Typography variant='h5' sx={{ fontFamily: "Montserrat", fontWeight: 'bold' }}>
                            Market Cap:{" "}
                        </Typography>
                        <Typography variant='h5' sx={{ fontFamily: "Montserrat", marginLeft: 2 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}
                            {" "} M
                        </Typography>
                    </Box>
                </Box>

            </div>

            {/* Chart Section */}
            <div style={{ flex: 1 }}>
                <CoinInfo coin={coin} />
            </div>
        </div>
    );
};

export default CoinPage;
