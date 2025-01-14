import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Equipment } from "../models/Equipment";  // Import Equipment type/model

interface EquipmentState {
    equipments: Equipment[];
}

export const initialState: EquipmentState = {
    equipments: [],  // Initialize with an empty array
};

const equipmentSlice = createSlice({
    name: "equipments",
    initialState,
    reducers: {
        addEquipment(state, action: PayloadAction<Equipment>) {
            state.equipments.push(action.payload);
        },
        updateEquipment(state, action: PayloadAction<Equipment>) {
            const index = state.equipments.findIndex(
                equipment => equipment.equipmentId === action.payload.equipmentId
            );
            if (index >= 0) {
                state.equipments[index] = action.payload;
            }
        },
        deleteEquipment(state, action: PayloadAction<string>) {
            state.equipments = state.equipments.filter(
                equipment => equipment.equipmentId !== action.payload
            );
        },
    },
});

export const { addEquipment, updateEquipment, deleteEquipment } = equipmentSlice.actions;

export default equipmentSlice.reducer;
