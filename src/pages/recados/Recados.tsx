import React from 'react';
import styled from '@emotion/styled';
import { Grid, Paper, } from "@mui/material";
import { HeaderRecados } from '../../components/headerRecados/HeaderRecados';
import { useNavigate } from 'react-router-dom';
import { CardRecado } from '../../components/cardRecado/CardRecado';

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

            <Grid item xs={12} md={11} sx={{ mt: 3 }}>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <CardRecado />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <CardRecado />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <CardRecado />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <CardRecado />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <CardRecado />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <CardRecado />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <CardRecado />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <CardRecado />
                    </Grid>
                </Grid>
            </Grid>
        </MeuContainer >
    );
}