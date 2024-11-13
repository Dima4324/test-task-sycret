const initialCertificateState = {
    ID: null,
    TABLENAME: null,
    PRIMARYKEY: null,
    NAME: "",
    DESCRIPTION: "",
    PRICE: null,
    SUMMA: null,
    DISCOUNT: null,
    IMAGEURL: "",
};
export const certificateReducer = (state = initialCertificateState, action) => {
    switch (action.type) {
        case "SET_CERTIFICATE":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}