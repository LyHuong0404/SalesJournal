import * as httprequest from "../utils/httprequest";

export const addCoupon = async({ pushToken, title, message }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    try {
        const response = await httprequest.post('send-notification', { pushToken, title, message } , config);
        return response;
    } catch(err) {
        console.log("Error when sending notification: ", err);
    }
}