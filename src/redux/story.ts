import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.ts";

export const store = configureStore({
    reducer: {
        todolist: todoReducer.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
