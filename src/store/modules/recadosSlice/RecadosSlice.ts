import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface Recados {
    uid: string,
    userId: string;
    tarefa: string,
    descricao: string,
    data: string,
};

const editAdapter = createEntityAdapter<Recados>({
    selectId: (recados) => recados.uid,
});

export const { selectAll, selectById } = editAdapter.getSelectors((state: RootState) => state.recados);

const slice = createSlice({
    name: "recados",
    initialState: editAdapter.getInitialState(),
    reducers: {
        adicionarRecado: editAdapter.addOne,
        atualizarRecado: editAdapter.updateOne,
        removerRecado: editAdapter.removeOne,
    },
});

export const { adicionarRecado, atualizarRecado, removerRecado } = slice.actions;

export default slice.reducer;