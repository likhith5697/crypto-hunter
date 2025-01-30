// SelectButton.js
import React from 'react';
import { Button } from '@mui/material';

const SelectButton = ({ onClick, selected, children }) => {
    return (
        <Button
            onClick={onClick}
            variant={selected ? "contained" : "outlined"}
            style={{
                backgroundColor: selected ? "#EEBC1D" : "",
                color: selected ? "black" : "",
            }}
        >
            {children}
        </Button>
    );
};

export default SelectButton;
