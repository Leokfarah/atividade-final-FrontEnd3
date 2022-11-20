import * as React from 'react';
import {
    TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    Card, CardActions, CardContent, Grid, Typography,
} from "@mui/material";
import { MeuBotao } from '../meubotao/MeuBotao';
import { useAppDispatch } from '../../store/modules/hooks';
import { atualizarRecado, Recados, removerRecado, selectAll, selectById } from '../../store/modules/recadosSlice/RecadosSlice';

export const CardRecado = ({ uid, userId, tarefa, descricao, data }: Recados) => {
    const [open, setOpen] = React.useState(false);
    const [newTarefa, setNewTarefa] = React.useState('')
    const [newDescricao, setNewDescricao] = React.useState('')
    const [newDate, setNewDate] = React.useState('');

    const dispatch = useAppDispatch();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateRecado = () => {
        dispatch(atualizarRecado({ id: uid, changes: { tarefa: newTarefa, descricao: newDescricao, data: newDate } }));
        handleClose()
    }

    const deleteRecado = () => {
        dispatch(removerRecado(uid))
    }

    return (
        <Card sx={{ minWidth: 200 }} elevation={5}>
            <CardContent>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {data}
                </Typography>

                <Typography variant="h5" component="div">
                    {tarefa}
                </Typography>

                <Typography variant="body2" marginTop={1} textAlign="justify">
                    {descricao}
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
                                deleteRecado()
                            }
                        }}
                    />
                </Grid>
            </CardActions>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar Recado</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tarefa"
                        label='Tarefa'
                        placeholder={tarefa}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={((e) => setNewTarefa(e.target.value))}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="descricao"
                        label="Descrição"
                        placeholder={descricao}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={((e) => setNewDescricao(e.target.value))}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="data"
                        type="date"
                        variant="standard"
                        sx={{ mt: 2 }}
                        onChange={((e) => setNewDate(e.target.value))}
                    />
                </DialogContent>

                <DialogActions>
                    <MeuBotao
                        texto='Cancelar' color='warning'
                        size='small' variant='text'
                        onClick={handleClose}
                    />

                    <MeuBotao
                        texto='Atualizar' color='success'
                        size='small' variant='text'
                        onClick={updateRecado}
                    />

                </DialogActions>
            </Dialog>
        </Card>
    );
};