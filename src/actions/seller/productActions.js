import * as httprequest from '../../utils/httprequest';

export const addProduct = async(formData) => { 
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    try {
        const response = await httprequest.post('add-product', formData, config);
        return response;
    }catch(err) {
        console.log("Error when creating product: ", err);
    }
}

export const updateProduct = async(formData) => { 
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    try {
        const response = await httprequest.post('update-product', formData, config);
        return response;
    }catch(err) {
        console.log("Error when creating product: ", err);
    }
}

export const deleteProduct = async(productId) => {
    try {
        const response = await httprequest.post(`delete-product/${productId}`);
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