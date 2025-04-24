import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface dataList {
    title: string;
    desc: string;
    completed: boolean;
    completedAt?: string;
}

interface inTodolist {
    data: dataList[];
}
const initialState: inTodolist = {
    data: JSON.parse(localStorage.getItem("listData") || "null") || [],
};
const todoSlice = createSlice({
    name: "todo list",
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<dataList>) => {
            state.data.push(action.payload);
            localStorage.setItem("listData", JSON.stringify(state.data));
        },
        deletelist: (state, action: PayloadAction<dataList>) => {
            const index = state.data.findIndex(
                (item) => item.title === action.payload.title
            );

            if (index !== -1) {
                state.data.splice(index, 1);
            }

            localStorage.setItem("listData", JSON.stringify(state.data));
        },
        toggleCompleted: (state, action: PayloadAction<dataList>) => {
            const index = state.data.findIndex(
                (item) => item.title === action.payload.title
            );
            console.log(index);
            console.log(state.data[index]);
            if (index !== -1) {
                state.data[index].completed = !state.data[index].completed;

                // state.showCompleted = !state.showCompleted;

                state.data[index].completedAt = state.data[index].completed
                    ? new Date().toISOString()
                    : undefined;
                localStorage.setItem("listData", JSON.stringify(state.data));
            }
        },
    },
});
export const { addList, deletelist, toggleCompleted } = todoSlice.actions;
export default todoSlice;
