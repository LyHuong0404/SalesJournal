import * as httprequest from '../../utils/httprequest';


export const filterAccount = async({ pageIndex, pageSize, keySearch, isVendor }) => {
    try {
        const filters = { pageIndex, pageSize, keySearch, isVendor  };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('admin/filter-user', { params: filteredParams });
        return response;
    } catch (err) {
        console.log("Error when filtering account: ", err);
    }
}


export const getNewInfoToday = async() => {
    try {
        const response = await httprequest.get('admin/info-today');
        return response?.data;
    } catch (err) {
        console.log("Error when admin is getting info today: ", err);
    }
}


export const filterTransaction = async({ pageIndex, pageSize, fromDate, toDate, orderBy, servicePackageId, paid, keySearch }) => {
    try {
        const filters = { pageIndex, pageSize, fromDate, toDate, orderBy, servicePackageId, paid, keySearch };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('admin/filter-transaction', { params: filteredParams });
        return response?.data;
    } catch (err) {
        console.log("Error when filtering transaction: ", err);
    }
}

export const sendNotificationVendorExpire = async() => {
    try {
        const response = await httprequest.get('admin/send-notification-vendor-expire');
        return response;
    } catch (err) {
        console.log("Error when admin is sending notifications: ", err);
    }
}

export const sendNotificationProductExpire = async() => {
    try {
        const response = await httprequest.get('admin/send-notification-product-expire');
        return response;
    } catch (err) {
        console.log("Error when admin is sending notifications: ", err);
    }
}

export const lockAccount = async(userId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try{
        const response = await httprequest.get(`admin/ban-account/${userId}`, config);
        return response;
    }catch(err) {
        console.log("Error when locking account: ", err);
    }
}

export const unlockAccount = async(userId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try{
        const response = await httprequest.get(`admin/unban-account/${userId}`, config);
        return response;
    }catch(err) {
        console.log("Error when unlocking account: ", err);
    }
}

export const handleMaintenence = async({ update }) => {
    try {
        const response = await httprequest.get('admin/maintenance', { params: { update } });
        return response;
    } catch (err) {
        console.log("Error when handling maintenence: ", err);
    }
}