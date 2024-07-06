import * as httprequest from '../../utils/httprequest';

export const filterProduct = async ({ pageIndex, pageSize, keySearch, productId, orderBy, fromDate, toDate }) => {
    try {
        const filters = { pageSize, pageIndex, keySearch, productId, orderBy, fromDate, toDate };
        const filteredParams = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined)
        );
        const response = await httprequest.get('filter-import-product', { params: filteredParams });
        return response?.data;
    } catch (err) {
        console.log("Error when filtering product: ", err);
    }
};

export const addProduct = async({code, name, expireAt, importPrice, importAmount, productId}) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await httprequest.post('add-import-product', {code, name, expireAt, importPrice, importAmount, productId}, config);
        return response;
    }catch(err) {
        console.log("Error when creating product: ", err);
    }
}

export const updateProduct = async({code, name, expireAt, stockAmount, importPrice, importAmount, productId, importProductId}) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await httprequest.post('update-import-product', {code, name, expireAt, stockAmount, importPrice, importAmount, productId, importProductId}, config);
        return response;
    }catch(err) {
        console.log("Error when updating product: ", err);
    }
}

export const deleteProduct = async(productId) => {
    try {
        const response = await httprequest.post(`delete-import-product/${productId}`);
        return response;

    } catch(err) {
        console.log("Error when deleting product: ", err);
    }
}

export const getProductById = async(productId) => {
    try {
        const response = await httprequest.get(`get-product-by-id/${productId}`);
        return response;

    } catch(err) {
        console.log("Error when getting product by ID: ", err);
    }
}

export const getProductByCode = async(productCode) => {
    try {
        const response = await httprequest.get(`product-of-receipt/${productCode}`);
        return response?.data;

    } catch(err) {
        console.log("Error when getting product by code: ", err);
    }
}


export const getImportProductByCode = async(productCode) => {
    try {
        const response = await httprequest.get('import-product-info', { params: { productCode } });
        return response;

    } catch(err) {
        console.log("Error when getting import product by code: ", err);
    }
}

