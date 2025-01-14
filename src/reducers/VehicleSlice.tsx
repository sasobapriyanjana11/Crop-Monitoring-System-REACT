import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Vehicle} from "../models/Vehicle.ts";


interface VehicleState {
    vehicles: Vehicle[];
}
export const initialState :VehicleState = {
    vehicles: [],
};

const vehicleSlice = createSlice({
    name:'vehicles',
    initialState,
    reducers:{
        addVehicle: (state, action:PayloadAction<Vehicle>) => {
            state.vehicles.push(action.payload);
        },
        updateVehicle: (state, action:PayloadAction<Vehicle>) => {
            const index = state.vehicles.findIndex(
                vehicle => vehicle.vehicleCode === action.payload.vehicleCode
            );
            if (index >= 0) {
                state.vehicles[index] = action.payload;
            }
        },
        deleteVehicle: (state, action:PayloadAction<string>) => {
            state.vehicles=state.vehicles.filter(
                vehicle => vehicle.vehicleCode !== action.payload);
        }
    }

})


export const { addVehicle,updateVehicle,deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;