import * as React from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import Paper from '@mui/material/Paper';
import { MeuBotao } from '../meubotao/MeuBotao';

function createData(
    tarefa: string,
    descricao: string,
    data: string,
    editbutton?: JSX.Element,
    deletebutton?: JSX.Element,
) {
    return { tarefa, descricao, data, editbutton, deletebutton };
}

export function TabelaRecados() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const rows = [
        createData('lalalalala', 'aebghrtyaiuyfas', '14/11/2022',
            <MeuBotao texto='editar' color='success' size='small' variant='contained' onClick={handleClickOpen} />,
            <MeuBotao texto='deletar' color='error' size='small' variant='contained' onClick={() => {
                if (window.confirm('Tem certeza que deseja excluir este recado?')) {
                    console.log('recado deletado')
                }
            }} />),
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tarefa</TableCell>
                        <TableCell align="left">Descrição</TableCell>
                        <TableCell align="left">Data</TableCell>
                        <TableCell align="center">Editar</TableCell>
                        <TableCell align="center">Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.tarefa}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.tarefa}
                            </TableCell>
                            <TableCell align="left">{row.descricao}</TableCell>
                            <TableCell align="left">{row.data}</TableCell>
                            <TableCell align="center">{row.editbutton}</TableCell>
                            <TableCell align="center">{row.deletebutton}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
        </TableContainer>
    );
}