import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Field} from "../models/Field.ts";
interface fieldState{
    fields:Field[];
}
export const initialState:fieldState={
    fields:[],
}
const fieldSlice = createSlice({
    name:'fields',
    initialState,
    reducers:{
        addFields(state, action:PayloadAction<Field>){
            state.fields.push(action.payload);

        },
        updateFields(state, action:PayloadAction<Field>){
            const index=state.fields.findIndex(
                field=>field.fieldCode === action.payload.fieldCode,
            );
            if(index >=0){
                state.fields[index] = action.payload;
            }

        },
        deleteFields(state, action:PayloadAction<string>){
            state.fields = state.fields.filter(
                field => field.fieldCode !== action.payload
            );
        }
    }
});

export const {addFields, updateFields,deleteFields}=fieldSlice.actions;
export default fieldSlice.reducer;
