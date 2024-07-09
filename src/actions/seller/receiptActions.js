import * as httprequest from '../../utils/httprequest';


export const createReceipt = async({ paymentMethod, buyerEmail, useBonusPoint, receiptDetailExportModels }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await httprequest.post('receipt-export', {paymentMethod, buyerEmail, useBonusPoint, receiptDetailExportModels}, config);
        return response;
    }catch(err) {
        console.log("Error when creating product: ", err);
    }
}

export const filterReceipt = async ({ pageIndex, pageSize, fromDate, toDate, paymentMethod }) => {
    try {
        const filters = { pageIndex, pageSize, fromDate, toDate, paymentMethod };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('filter-receipt', { params: filteredParams });
        return response;
    } catch (err) {
        console.log("Error when filtering receipt: ", err);
    }
};

export const filterReport = async({ fromDate, toDate }) => { 
    try {
        const response = await httprequest.get('revenue-info', { params: { fromDate, toDate } });
        return response?.data;
    }catch(err) {
        console.log("Error when fitering report: ", err);
    }
}

export const revenueDailyGross = async({ fromDate, toDate }) => { 
    try {
        const response = await httprequest.get('revenue-by-date', { params: { fromDate, toDate } });
        return response?.data;
    }catch(err) {
        console.log("Error when fitering report: ", err);
    }
}

export const revenueOfProduct = async({ pageIndex, pageSize, fromDate, toDate }) => { 
    try {
        const response = await httprequest.get('revenue-of-product', { params: { pageIndex, pageSize, fromDate, toDate } });
        return response?.data;
    }catch(err) {
        console.log("Error when getting revenue of product: ", err);
    }
}

export const returnReceipt = async({ receiptId, productInfos }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await httprequest.post('return-product', { receiptId, productInfos }, config);
        return response;
    }catch(err) {
        console.log("Error when returning receipt: ", err);
    }
}


