export const SET_HYDRANTS = "SET_HYDRANTS";

export const setHydrants = hydrants => {
    console.log("setHydrants")
    return {
        type: SET_HYDRANTS,
        hydrants: hydrants
    }
}