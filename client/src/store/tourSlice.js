import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    detail: {
        tourName: '',
        tourScheduleId: '',
        numberOfDay: '',
        numberOfNight: '',
        departureDay: '',
        childPrice: '',
        adultPrice: '',
    },
};

const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        setTour: (state, action) => {
            state.detail = action.payload;
        },
    },
});

export const { setTour } = tourSlice.actions;

export default tourSlice.reducer;
