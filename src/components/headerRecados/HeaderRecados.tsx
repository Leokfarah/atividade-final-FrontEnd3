import * as React from 'react';
import {
    Box, AppBar, Toolbar, Button, IconButton, Typography,
    TextField, Dialog, DialogActions, DialogContent, DialogTitle,
} from "@mui/material";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../store/modules/hooks';
import { adicionarRecado } from '../../store/modules/recadosSlice/RecadosSlice';
import { v4 as uuidv4 } from "uuid";
import { MeuAlert } from '../meuAlert/MeuAlert';

export const HeaderRecados = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [tarefa, setTarefa] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [data, setData] = React.useState('');
    const [alerta, setAlerta] = React.useState(false);
    const dispatch = useAppDispatch();

    const addRecado = () => {
        const userLogado = localStorage.getItem('usuarioLogado');

        if (userLogado) {
            if (!descricao && !tarefa) {
                meuAlerta();
                return
            }
            const novoRecado = {
                uid: uuidv4(),
                userId: userLogado,
                tarefa: tarefa,
                descricao: descricao,
                data: data,
            };

            dispatch(adicionarRecado(novoRecado));
            limparEstados();
            handleClose();
        }
    };

    const limparEstados = () => {
        setTarefa('');
        setDescricao('');
        setData('');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const meuAlerta = () => {
        setAlerta(true);

        setTimeout(() => {
            setAlerta(false);
        }, 4000);
    }

    function deslogar() {
        localStorage.removeItem('usuarioLogado');
        return navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1, boxShadow: '0 0 20px 1px white' }}>
            <AppBar position="static">
                <Toolbar>

                    <IconButton
                        size="large" edge="start"
                        color="inherit" aria-label="NoteAddOutlinedIcon"
                        onClick={handleClickOpen}
                    >
                        <NoteAddOutlinedIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 0.5 }}>
                        Adicionar novo recado
                    </Typography>

                    <Button color="inherit" onClick={deslogar}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Novo Recado</DialogTitle>

                {alerta && <MeuAlert titulo='Erro ao criar recado'
                    mensagem='Você deve digitar a tarefa e descrição' severity='warning'
                />}

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tarefa"
                        label="Tarefa"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={((e) => setTarefa(e.target.value))}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="descricao"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={((e) => setDescricao(e.target.value))}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="data"
                        type="date"
                        variant="standard"
                        sx={{ mt: 2 }}
                        onChange={((e) => setData(e.target.value))}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color='warning'>Cancelar</Button>
                    <Button onClick={addRecado} color='success'>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};