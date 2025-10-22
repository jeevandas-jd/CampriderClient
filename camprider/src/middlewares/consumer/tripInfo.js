
let TripInfo= null;

export const setTripInfo = (info) => {
    if (TripInfo){
        //clear previous info
        TripInfo = null;
    }
    TripInfo = info;
    console.log("TripInfo set to:", TripInfo);
    }
export const getTripInfo = () => {
    return TripInfo;
};