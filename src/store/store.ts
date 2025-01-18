import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cropSlice from "../reducers/CropSlice";
import equipmentSlice from "../reducers/EquipmentSlice";
import staffSlice from "../reducers/StaffSlice";
import vehicleSlice from "../reducers/VehicleSlice.tsx";
import fieldSlice from "../reducers/FieldSlice";
import monitoringLogSlice from "../reducers/MonitoringLogSlice";
import authSlice from "../reducers/AuthSlice.tsx";

const rootReducer = combineReducers({
    crops: cropSlice,
    equipments:equipmentSlice,
    staff: staffSlice,
    vehicles: vehicleSlice,
    fields:fieldSlice,
    mLogs:monitoringLogSlice,
    auth:authSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
