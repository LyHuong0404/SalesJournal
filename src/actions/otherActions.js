import * as httprequest from "../utils/httprequest";

export const notifications = async({ pushToken, title, message }) => { 
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

export const updateStore = async({ profileId, nameStore, allowCustomerAccumulate, exchangePointToMoney, exchangeMoneyToPoint }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    try {
        const filters = { profileId, nameStore, allowCustomerAccumulate, exchangePointToMoney, exchangeMoneyToPoint };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value != null));
        const response = await httprequest.post('update-profile', { filteredParams } , config);
        return response;
    } catch(err) {
        console.log("Error when updating store: ", err);
    }
}

