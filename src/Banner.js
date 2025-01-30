import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Carousel from './Carousel';

const Banner = () => {

    return (
        <Box
            sx={{
                backgroundImage: "url('./banner2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
            }}
        >
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 3,
                    justifyContent: "space-around",
                }}
            >
                <div style={{
                    display: "flex",
                    height: "40%",
                    flexDirection: "column",
                    paddingTop: 25,
                    justifyContent: "space-around",
                    alignItems: "flex-start"
                }}>
                    <Typography variant='h2'
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                            textTransform: "capitalize",
                            textAlign: "left"
                        }}>
                        Crypto Hunter
                    </Typography>
                    <Typography>
                        Get all Info regarding your favourite crypto currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </Box>
    );
};
export default Banner;
