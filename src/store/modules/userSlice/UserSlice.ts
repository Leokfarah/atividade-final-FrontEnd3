import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";

export interface User {
    email: string,
    senha: string,
};

const adapter = createEntityAdapter<User>({
    selectId: (usuarios) => usuarios.email,
});

export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.usuarios);

const slice = createSlice({
    name: "usuarios",
    initialState: adapter.getInitialState(),
    reducers: {
        adicionarUser: adapter.addOne,
    },
});

export const { adicionarUser, } = slice.actions;

export default slice.reducer;
