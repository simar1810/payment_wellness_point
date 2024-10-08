import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mealKit: {
    image: null,
    name: "",
    description: "",
    meals: [
      {
        mealType: "",
        meals: [
          {
            mealTiming: "",
            instructions: "",
          },
        ],
      },
    ],
  },
};

const mealKitSlice = createSlice({
  name: "mealKit",
  initialState,
  reducers: {
    setMealKit: (state, action) => {
      state.mealKit = {
        ...state.mealKit,
        ...action.payload,
      };
    },
    addMeal: (state, action) => {
      state.mealKit.meals.push(...action.payload);
    },
    resetMealKit: (state) => {
      state.mealKit = initialState.mealKit;
    },
  },
});

export const { setMealKit, addMeal, resetMealKit } = mealKitSlice.actions;
export default mealKitSlice.reducer;
