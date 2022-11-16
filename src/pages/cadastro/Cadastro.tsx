import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { MeuTitulo } from '../../components/titulo/Titulo';
import { MeuInput } from '../../components/meuinput/MeuInput';
import { MeuBotao } from '../../components/meubotao/MeuBotao';
import { adicionarUser, selectAll } from '../../store/modules/userSlice/UserSlice';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';


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
    padding: '10px',
    opacity: '70%',
    background: '#fafafa',
    filter: 'drop-shadow(0px 0px 20px white)',
}));

export const Cadastro = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const navigate = useNavigate();
    const usuarios = useAppSelector(selectAll);
    const dispatch = useAppDispatch();


    function CadastrarClick() {
        if (!email) {
            alert('Digite um email válido!')
            return
        }

        if (!password) {
            alert('Digite uma senha válida!')
            return
        }

        if (password !== rePassword) {
            alert('As senhas não conferem!')
            return
        }

        if (!email.match(/\S+@\S+\.\S/)) {
            alert('Digite um email válido!')
            return
        }

        const existeEmail = usuarios.some((usuarios) => usuarios.email === email)

        if (existeEmail) {
            alert('Usuário já cadastrado!')
            limparCampos();
            return
        }

        cadastraUsuario();
        limparCampos();
        alert('Usuário cadastrado com sucesso!');
        navegaLogin();
    }

    function cadastraUsuario() {
        const novoUsuario = {
            email: email,
            senha: password,
            recados: [],
        }

        dispatch(adicionarUser(novoUsuario))
    }

    function limparCampos() {
        setEmail('');
        setPassword('');
        setRePassword('');
    }


    function navegaLogin() {
        return navigate('/');
    }

    return (
        <MeuContainer container xs={12}>
            <Grid item xs={8} md={4}>
                <MeuPaper elevation={24}>
                    <MeuTitulo
                        variant='h4' align='center'
                        texto='Crie sua Conta'
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

                    <MeuInput
                        label='Repetir Senha' type='password' variant='standard'
                        placeholder='Repetir Senha' color='primary'
                        size='medium' value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />

                    <MeuBotao
                        texto='Cadastrar' color='primary'
                        size='medium' variant='outlined'
                        onClick={CadastrarClick}
                    />

                    <MeuBotao
                        texto='Já possui conta?' color='info'
                        size='small' variant='text'
                        onClick={navegaLogin}
                    />
                </MeuPaper>
            </Grid>
        </MeuContainer>
    );
};