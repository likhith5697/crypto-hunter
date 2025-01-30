import React, { useEffect, useState } from 'react';
import { CryptoState } from './CryptoContext';
import { TrendingCoins } from './config/api';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        const profit = coin?.price_change_percentage_24h >= 0;

        return (
            <Link to={`/coins/${coin.id}`} key={coin.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src={coin?.image}
                        alt={coin.name}
                        height="80"
                        style={{ marginBottom: 10 }}
                    />
                    <span style={{ fontSize: 18, fontWeight: 500 }}>
                        {coin?.symbol.toUpperCase()}
                    </span>
                    <span
                        style={{
                            color: profit ? 'green' : 'red',
                            fontWeight: 500,
                        }}
                    >
                        {profit && '+'}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                    <span style={{ fontSize: 22, fontWeight: 500 }}>
                        {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
                </div>
            </Link>
        );
    });

    const responsive = {
        0: { items: 2 },
        512: { items: 4 },
    };






    return (
        <div
            style={{
                height: '50%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    );
};

export default Carousel;
