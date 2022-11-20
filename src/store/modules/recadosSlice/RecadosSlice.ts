import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export interface Recados {
    uid: string,
    userId: string;
    tarefa: string,
    descricao: string,
    data: string,
};

// const adapter = createEntityAdapter<Recados>({
//     selectId: (recados) => recados.userId,
// });

const editAdapter = createEntityAdapter<Recados>({
    selectId: (recados) => recados.uid,
});

// export const { selectAll } = adapter.getSelectors((state: any) => state.recados);

export const { selectAll, selectById } = editAdapter.getSelectors((state: any) => state.recados);

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