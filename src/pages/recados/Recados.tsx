import React from 'react';
import styled from '@emotion/styled';
import { Grid, Paper, } from "@mui/material";
import { TabelaRecados } from '../../components/tabelaRecados/TabelaRecados';
import { HeaderRecados } from '../../components/headerRecados/HeaderRecados';
import { useNavigate } from 'react-router-dom';

const MeuContainer = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(https://i.imgur.com/3Ojge6Y.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const MeuPaper = styled(Paper)(() => ({
    display: 'flex',
    flexDirection: 'column',
    opacity: '90%',
    background: '#cdcdcd',
    filter: 'drop-shadow(0px 0px 8px white)',
}));

export const Recados = () => {
    const estaLogado: string = localStorage.getItem('usuarioLogado') || '';
    const navigate = useNavigate();

    React.useEffect(() => {

        if (!estaLogado) {
            return navigate('/');
        }

    }, []);

    return (
        <MeuContainer container xs={12}>
            <HeaderRecados />

            <Grid item xs={12} md={11}>
                <MeuPaper elevation={1} sx={{ mt: 1 }}>
                    <TabelaRecados />
                </MeuPaper>
            </Grid>
        </MeuContainer >
    );
}