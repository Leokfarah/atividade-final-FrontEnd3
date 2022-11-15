import * as React from 'react';
import TextField from '@mui/material/TextField';

interface MeuImputProps {
    label: string,
    type: string,
    placeholder: string,
    value: string,
    color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    size: 'medium' | 'small',
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

export const MeuInput = ({ label, type, value, placeholder, color, size, onChange }: MeuImputProps) => {
    return (
        <TextField variant="standard" label={label}
            type={type} placeholder={placeholder}
            color={color} size={size}
            value={value} onChange={onChange} sx={{ m: 1 }}
        />
    );
}