import React from 'react';
import styled from '@emotion/styled';
import { Grid, Paper } from "@mui/material";
import { HeaderRecados } from '../../components/headerRecados/HeaderRecados';
import { useNavigate } from 'react-router-dom';
import { CardRecado } from '../../components/cardRecado/CardRecado';
import { selectAll } from '../../store/modules/recadosSlice/RecadosSlice';
import { useAppSelector } from '../../store/modules/hooks';

const MeuContainer = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(https://images2.alphacoders.com/163/163710.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

export const PageRecados = () => {
    const estaLogado: string = localStorage.getItem('usuarioLogado') || '';
    const recados = useAppSelector(selectAll);
    const recadosUsuarioLogado = recados.filter((recado) => recado.userId === estaLogado);
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
                    {recadosUsuarioLogado.map((recados) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <CardRecado uid={recados.uid} userId={recados.userId}
                                tarefa={recados.tarefa} descricao={recados.descricao}
                                data={recados.data} key={recados.uid}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </MeuContainer >
    );
}