import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";


export interface User {
    email: string,
    senha: string,
};

const adapter = createEntityAdapter<User>({
    selectId: (usuarios) => usuarios.email,
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
