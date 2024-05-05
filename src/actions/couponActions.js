import * as httprequest from "../utils/httprequest";

export const addCoupon = async({ couponCode, description, limitUse, startDate, endDate, type, proviso, value, provisoMinPrice, provisoMinAmount, productIds }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const filters = { couponCode, description, limitUse, startDate, endDate, type, proviso, value, provisoMinPrice, provisoMinAmount, productIds };
    const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
    try {
        const response = await httprequest.post('add-coupon', filteredParams , config);
        return response;
    }catch(err) {
        console.log("Error when creating coupon: ", err);
    }
}

export const updateCoupon = async({ couponId, couponCode, description, limitUse, startDate, endDate, type, proviso, value, provisoMinPrice, provisoMinAmount }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const filters = { couponId, couponCode, description, limitUse, startDate, endDate, type, proviso, value, provisoMinPrice, provisoMinAmount };
    const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
    try {
        const response = await httprequest.post('update-coupon', filteredParams , config);
        return response;
    } catch(err) {
        console.log("Error when updating coupon: ", err);
    }
}

export const applyProductForCoupon = async({ couponId, productId }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    try {
        const response = await httprequest.post('apply-for-product', { couponId, productId } , config);
        return response;
    } catch(err) {
        console.log("Error when applying product for coupon: ", err);
    }
}

export const unapplyProductForCoupon = async({ couponOfProductId }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    try {
        const response = await httprequest.post('unapply-for-product', { couponOfProductId } , config);
        return response;
    } catch(err) {
        console.log("Error when unapplying product for coupon: ", err);
    }
}

export const stopCoupon = async({ couponId }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    try {
        const response = await httprequest.post('stop-coupon', { couponId } , config);
        return response;
    } catch(err) {
        console.log("Error when stopping coupon: ", err);
    }
}

export const filterCoupon = async({ pageIndex, pageSize, keySearch, orderBy }) => {
    try {
        const filters = { pageSize, pageIndex, keySearch, orderBy };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('filter-coupon', { params: filteredParams });
        return response?.data;
    } catch (err) {
        console.log("Error when filtering coupon: ", err);
    }
}

export const getCouponById = async(couponId) => {
    try {
        const response = await httprequest.get(`get-coupon/${couponId}`);
        return response;

    } catch(err) {
        console.log("Error when getting coupon by ID: ", err);
    }
}