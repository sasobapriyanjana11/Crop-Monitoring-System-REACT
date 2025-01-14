import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MonitoringLog} from "../models/MonitoringLog.ts";

interface MonitoringLogState{
    mLogs:MonitoringLog[];
}
export const initialState:MonitoringLogState={
    mLogs:[],
}
const monitoringLogSlice=createSlice({
    name:"mLogs",
    initialState,
    reducers:{
        addMonitoringLog(state,action:PayloadAction<MonitoringLog>){
            state.mLogs.push(action.payload);
        },
        updateMonitoringLog(state,action:PayloadAction<MonitoringLog>){
            const index=state.mLogs.findIndex(
                mLog=>mLog.logCode===action.payload.logCode,
            );
            if(index >=0){
                state.mLogs[index] = action.payload;
            }
        },
        deleteMonitoringLog(state,action:PayloadAction<string>){
            state.mLogs = state.mLogs.filter(
                mLog => mLog.logCode !== action.payload
            );
        }
    }
});
export const {addMonitoringLog,updateMonitoringLog,deleteMonitoringLog} = monitoringLogSlice.actions;
export default monitoringLogSlice.reducer;