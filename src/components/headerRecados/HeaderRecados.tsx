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

export const HeaderRecados = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [tarefa, setTarefa] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [data, setData] = React.useState('');
    const dispatch = useAppDispatch();

    const addRecado = () => {
        const userLogado = localStorage.getItem('usuarioLogado');

        if (userLogado) {
            const novoRecado = {
                uid: uuidv4(),
                userId: userLogado,
                tarefa: tarefa,
                descricao: descricao,
                data: data,
            };

            dispatch(adicionarRecado(novoRecado))
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function deslogar() {
        localStorage.removeItem('usuarioLogado')
        return navigate('/')
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                        fullWidth
                        variant="standard"
                        sx={{ mt: 2 }}
                        onChange={((e) => setData(e.target.value))}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={addRecado}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};