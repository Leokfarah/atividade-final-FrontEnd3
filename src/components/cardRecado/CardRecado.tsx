import * as React from 'react';
import {
    TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    Card, CardActions, CardContent, Grid, Typography,
} from "@mui/material";
import { MeuBotao } from '../meubotao/MeuBotao';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { selectAll } from '../../store/modules/recadosSlice/RecadosSlice';

export const CardRecado = () => {
    const [open, setOpen] = React.useState(false);
    const recados = useAppSelector(selectAll);
    const dispatch = useAppDispatch();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{ minWidth: 200 }} elevation={5}>
            <CardContent>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    15/11/2022
                </Typography>

                <Typography variant="h5" component="div">
                    Nome do Recado
                </Typography>

                <Typography variant="body2" marginTop={1} textAlign="justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut amet provident unde cumque consequuntur officiis iure quas inventore
                </Typography>

            </CardContent>

            <CardActions>
                <Grid container justifyContent={'flex-end'}>

                    <MeuBotao texto='editar' color='secondary'
                        size='small' variant='contained'
                        onClick={handleClickOpen}
                    />

                    <MeuBotao texto='deletar' color='error'
                        size='small' variant='contained'
                        onClick={() => {
                            if (window.confirm('Tem certeza que deseja excluir este recado?')) {
                                console.log('recado deletado')
                            }
                        }}
                    />
                </Grid>
            </CardActions>

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
                    <MeuBotao
                        texto='Cancelar' color='warning'
                        size='small' variant='text'
                        onClick={handleClose}
                    />

                    <MeuBotao
                        texto='Adicionar' color='success'
                        size='small' variant='text'
                        onClick={handleClose}
                    />

                </DialogActions>
            </Dialog>
        </Card>
    );
}