import * as httprequest from '../../utils/httprequest';


export const filterCategory = async ({ pageIndex, pageSize, keySearch }) => {
    try {
        const response = await httprequest.get('filter-product', { params: { pageIndex, pageSize, keySearch } });
        return response.data;
    } catch (err) {
        console.log("Error when filtering category: ", err);
    }
};

//formData: name, salePrice, avatarFile
export const addCategory = async (formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try {
        const response = await httprequest.post('add-product', formData, config);
        return response;
    } catch (err) {
        console.log("Error when creating category: ", err);
    }
};

//formData: name, categoryId
export const updateCategory = async(formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try{
        const response = await httprequest.post('update-product', formData, config);
        return response;
    }catch(err) {
        console.log("Error when updating category: ", err);
    }
}

//delete
export const deleteCategory = async(productId) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try{
        const response = await httprequest.post(`delete-product/${productId}`, config);
        return response;
    }catch(err) {
        console.log("Error when deleting category: ", err);
    }
}

//get category by id
export const getCategoryById = async(categoryId) => {
    try {
        const response = await httprequest.get(`product-info/${categoryId}`);
        return response.data;

    } catch(err) {
        console.log("Error when getting category by ID: ", err);
    }
}