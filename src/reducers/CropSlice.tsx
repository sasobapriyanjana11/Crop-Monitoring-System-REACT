import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Crop {
    cropCode: string;
    commonName: string;
    scientificName: string;
    category: string;
    cropSeason: string;
    fieldCode: string;
    image: string; // Store image URL or filename, not the File object
}

interface CropsState {
    crops: Crop[];
}

export const initialState: CropsState = {
    crops: [],
};

const cropSlice = createSlice({
    name: 'crops',
    initialState,
    reducers: {
        saveCrop(state, action: PayloadAction<Crop>) {
            state.crops.push(action.payload);
        },
        updateCrop(state, action: PayloadAction<Crop>) {
            const index = state.crops.findIndex(crop => crop.cropCode === action.payload.cropCode);
            if (index >= 0) {
                state.crops[index] = action.payload;
            }
        },
        removeCrop(state, action: PayloadAction<string>) {
            state.crops = state.crops.filter(crop => crop.cropCode !== action.payload);
        },
    },
});

export const { saveCrop, updateCrop, removeCrop } = cropSlice.actions;
export default cropSlice.reducer;




