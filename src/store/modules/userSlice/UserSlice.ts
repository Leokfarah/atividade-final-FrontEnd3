import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Recados } from "../recadosSlice/RecadosSlice";


export interface User {
    email: string,
    senha: string,
    recados: Recados[],
}

const adapter = createEntityAdapter<User>({
    selectId: (user) => user.email,
});

export const { selectAll, selectById } = adapter.getSelectors((state: any) => state.usuarios);

const slice = createSlice({
    name: "usuarios",
    initialState: adapter.getInitialState(),
    reducers: {
        adicionarUser: adapter.addOne,
    },
});

export const { adicionarUser, } = slice.actions;

export default slice.reducer;
