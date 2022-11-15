import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export interface Recados {
    tarefa: string,
    descricao: string,
    data: string,
    uid: string,
}

const adapter = createEntityAdapter<Recados>({
    selectId: (recados) => recados.uid,
});

export const { selectAll, selectById } = adapter.getSelectors((state: any) => state.recados);

const slice = createSlice({
    name: "recados",
    initialState: adapter.getInitialState(),
    reducers: {
        adicionarRecado: adapter.addOne,
        atualizarRecado: adapter.updateOne,
        removerRecado: adapter.removeOne,
    },
});

export const { adicionarRecado, atualizarRecado, removerRecado } = slice.actions;

export default slice.reducer;