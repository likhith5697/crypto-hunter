import React, { useEffect, useState } from 'react';
import { CryptoState } from './CryptoContext';
import axios from 'axios';
import { HistoricalChart } from './config/api';
import { CircularProgress, createTheme, ThemeProvider, Box, Typography, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import SelectButton from './SelectButton';
import { chartDays } from './config/data';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

//Registering components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const CoinInfo = ({ coin }) => {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();
    const [flag, setFlag] = useState(false);
    const theme = useTheme();

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setFlag(true);
        setHistoricalData(data.prices);
    };

    useEffect(() => {
        fetchHistoricalData();
    }, [currency, days]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                sx={{
                    width: '75%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5,
                    padding: 5,
                    [theme.breakpoints.down("md")]: {
                        width: '100%',
                        marginTop: 0,
                        padding: 3,
                        paddingTop: 0,
                    },
                }}
            >
                {!historicalData || flag === false ? (
                    <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: historicalData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),
                                datasets: [
                                    {
                                        data: historicalData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: '#EEBC1D',
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                marginTop: 2,
                                justifyContent: 'space-around',
                                width: '100%',
                            }}
                        >
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => {
                                        setDays(day.value);
                                        setFlag(false);
                                    }}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </Box>
                    </>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default CoinInfo;
