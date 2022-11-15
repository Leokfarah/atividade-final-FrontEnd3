import * as React from 'react';
import {
    Box, AppBar, Toolbar, Button, IconButton, Typography,
    TextField, Dialog, DialogActions, DialogContent, DialogTitle,
} from "@mui/material";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useNavigate } from "react-router-dom";

export const HeaderRecados = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function deslogar() {
        localStorage.removeItem('usuarioLogado')
        return navigate('/')
    }

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
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="descricao"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="data"
                        type="date"
                        fullWidth
                        variant="standard"
                        sx={{ mt: 2 }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}