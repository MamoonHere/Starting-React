import { createSlice, current } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
    name : "myComponent",
    initialState: {
        index: -1,
        taskList : [],
        replacementText: '',
        completeIndex: -1
    },
    reducers: {
        addTask: (state, action) => {
            state.taskList = state.taskList.concat(action.payload.taskList); //The idea of immutability removed
            //console.log(current(state));
        },
        deleteTask: (state, action) => {
            state.taskList = state.taskList.filter(item => item !== state.taskList[action.payload.index]);
            state.index = -1;
        },
        updateTask: (state, action) => {
            state.taskList[action.payload.index] = action.payload.replacementText;
            state.replacementText = '';
            state.index = -1;
        },
        doneTask: (state, action) => {
            let doneTask = state.taskList[action.payload.index];
            state.taskList = state.taskList.filter(item => item !== state.taskList[action.payload.index]);
            state.taskList.unshift(doneTask);
            state.index = -1;
            state.completeIndex += 1;
        }
    }
}
)

export const { addTask, deleteTask, updateTask, doneTask} = taskSlice.actions

export default taskSlice.reducer