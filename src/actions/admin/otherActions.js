import * as httprequest from '../../utils/httprequest';


export const filterAccount = async({ pageIndex, pageSize, keySearch, isVendor }) => {
    try {
        const filters = { pageIndex, pageSize, keySearch, isVendor  };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('admin/filter-user', { params: filteredParams });
        return response?.content;
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
        console.log("Error when admin is getting info today: ", err);
    }
}