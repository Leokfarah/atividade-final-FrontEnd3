import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Paper } from "@mui/material";
import { MeuInput } from '../../components/meuinput/MeuInput';
import { MeuBotao } from '../../components/meubotao/MeuBotao';
import { MeuTitulo } from '../../components/titulo/Titulo';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/modules/hooks';
import { selectAll, User } from '../../store/modules/userSlice/UserSlice';
import { MeuAlert } from '../../components/meuAlert/MeuAlert';

const MeuContainer = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(https://i.imgur.com/3Ojge6Y.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const MeuPaper = styled(Paper)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '15px',
    opacity: '70%',
    background: '#fafafa',
    filter: 'drop-shadow(0px 0px 20px white)',
}));

export const Login = () => {
    const estaLogado: string = localStorage.getItem('usuarioLogado') || '';
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [alerta, setAlerta] = React.useState(false);
    const cadastrados = useAppSelector(selectAll);
    const navigate = useNavigate();

    React.useEffect(() => {

        if (estaLogado) {
            alert('ALERTA DO SISTEMA: \n Você ja está logado!');
            navegaRecados();
            return
        }

    }, []);

    const logarClick = () => {
        if (!email) {
            alertaLogin();
            return
        }

        if (!password) {
            alertaLogin();
            return
        }

        const emailCadastrado = cadastrados.some((cadastrados: User) => cadastrados.email === email && cadastrados.senha === password)

        if (!emailCadastrado) {
            alertaLogin();
            return
        }

        localStorage.setItem('usuarioLogado', email);
        navegaRecados();
    }

    function navegaRecados() {
        return navigate('/recados');
    }

    function navegaCadastro() {
        return navigate('/cadastro');
    }

    const alertaLogin = () => {
        setAlerta(true);

        setTimeout(() => {
            setAlerta(false)
        }, 3000);
    }


    return (
        <>
            {alerta && <MeuAlert titulo='Erro ao Logar'
                mensagem='Verifique as credenciais digitadas!'
                severity='error'
            />}

            <MeuContainer container xs={12}>
                <Grid item xs={8} md={4}>
                    <MeuPaper elevation={24}>
                        <MeuTitulo
                            variant='h4' align='center'
                            texto='☠️ Recado Caveira ☠️'
                        />


                        <MeuInput
                            label='E-mail' type='email' variant='standard'
                            placeholder='E-mail' color='primary'
                            size='medium' value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <MeuInput
                            label='Senha' type='password' variant='standard'
                            placeholder='Senha' color='primary'
                            size='medium' value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <MeuBotao
                            texto='Entrar' color='primary'
                            size='medium' variant='outlined'
                            onClick={logarClick}
                        />

                        <MeuBotao
                            texto='não possui conta?' color='info'
                            size='small' variant='text'
                            onClick={navegaCadastro}
                        />
                    </MeuPaper>
                </Grid>
            </MeuContainer>
        </>
    );
}