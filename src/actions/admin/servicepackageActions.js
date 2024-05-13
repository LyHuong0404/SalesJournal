import * as httprequest from '../../utils/httprequest';

export const addServicePackage = async({ price, day }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await httprequest.post('admin/add-service-package', { price, day }, config);
        return response;
    }catch(err) {
        console.log("Error when adding service package: ", err);
    }
}

export const updateServicePackage = async({ servicePackageId, price, day }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await httprequest.post('admin/update-service-package', { servicePackageId, price, day }, config);
        return response;
    }catch(err) {
        console.log("Error when adding service package: ", err);
    }
}

export const lockServicePackage = async(servicePackageId) => {
    try {
        const response = await httprequest.get(`admin/locked-service-package/${servicePackageId}`);
        return response;

    } catch(err) {
        console.log("Error when lock Service Package: ", err);
    }
}

export const unlockServicePackage = async(servicePackageId) => {
    try {
        const response = await httprequest.get(`admin/unlocked-service-package/${servicePackageId}`);
        return response;

    } catch(err) {
        console.log("Error when unlock Service Package: ", err);
    }
}


