import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { MeuTitulo } from '../../components/titulo/Titulo';
import { MeuInput } from '../../components/meuinput/MeuInput';
import { MeuBotao } from '../../components/meubotao/MeuBotao';
import { adicionarUser, selectAll } from '../../store/modules/userSlice/UserSlice';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { AlertProps, MeuAlert } from '../../components/meuAlert/MeuAlert';


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
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [alerta, setAlerta] = useState(false);
    const [severidadeAlerta, setSeveridadeAlerta] = useState<AlertProps["severity"]>('error');
    const [tituloAlerta, setTituloAlerta] = useState<string>('');
    const [mensagemAlerta, setMensagemAlerta] = useState<string>('');
    const navigate = useNavigate();
    const usuarios = useAppSelector(selectAll);
    const dispatch = useAppDispatch();


    const CadastrarClick = () => {
        if (!email) {
            setSeveridadeAlerta('error');
            setTituloAlerta('Erro ao cadastrar');
            setMensagemAlerta('Digite um email');
            AlertaCadastro();
            return
        }

        if (!password) {
            setSeveridadeAlerta('error');
            setTituloAlerta('Erro ao cadastrar');
            setMensagemAlerta('Digite uma senha');
            AlertaCadastro();
            return
        }

        if (password !== rePassword) {
            setSeveridadeAlerta('warning');
            setTituloAlerta('Erro ao cadastrar');
            setMensagemAlerta('As senhas não conferem');
            AlertaCadastro();
            return
        }

        if (!email.match(/\S+@\S+\.\S/)) {
            setSeveridadeAlerta('warning');
            setTituloAlerta('Erro ao cadastrar');
            setMensagemAlerta('Digite um email válido ( usuario@email.com )');
            AlertaCadastro();
            return
        }

        const existeEmail = usuarios.some((usuarios) => usuarios.email === email);

        if (existeEmail) {
            setSeveridadeAlerta('warning');
            setTituloAlerta('Erro ao cadastrar');
            setMensagemAlerta('Usuário já cadastrado');
            AlertaCadastro();
            limparCampos();
            return
        }

        cadastraUsuario();
        limparCampos();
        setSeveridadeAlerta('success');
        setTituloAlerta('Usuário cadastrado com sucesso');
        setMensagemAlerta(`${email} Seja bem vindo ao recado Caveira`);
        AlertaCadastro();

        setTimeout(() => {
            navegaLogin();
        }, 3200);

    }

    function cadastraUsuario() {
        const novoUsuario = {
            email: email,
            senha: password,
        }

        dispatch(adicionarUser(novoUsuario));
    }

    function limparCampos() {
        setEmail('');
        setPassword('');
        setRePassword('');
    }

    const AlertaCadastro = () => {
        setAlerta(true);

        setTimeout(() => {
            setAlerta(false)
        }, 3000);
    }

    function navegaLogin() {
        return navigate('/');
    }

    return (
        <>
            {alerta && <MeuAlert titulo={tituloAlerta}
                mensagem={mensagemAlerta} severity={severidadeAlerta}
            />}

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
        </>
    );
};