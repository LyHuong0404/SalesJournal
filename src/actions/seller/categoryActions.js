import * as httprequest from '../../utils/httprequest';

//formData: name
export const addCategory = async (formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try {
        const response = await httprequest.post('add-category', formData, config);
        return response;
    } catch (err) {
        console.log("Error when creating category: ", err);
    }
};

//formData: name, categoryId
export const updateCategory = async() => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try{
        const response = await httprequest.post('update-category', formData, config);
        return response;
    }catch(err) {
        console.log("Error when updating category: ", err);
    }
}

//
export const deleteCategory = async() => {
    try{

    }catch(err) {
        console.log("Error when deleting category: ", err);
    }
}