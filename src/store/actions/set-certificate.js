import { ACTION_TYPE } from "./action-type";

export const setCertificate = (certificate) => ({
    type: ACTION_TYPE.SET_CERTIFICATE,
    payload: certificate
})