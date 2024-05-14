import * as httprequest from "../../utils/httprequest";


export const filterBonus = async({ pageIndex, pageSize }) => {
    try {
        const response = await httprequest.get('buyer-filter-bonus', { params: { pageIndex, pageSize } });
        return response?.data;
    } catch (err) {
        console.log("Error when filtering bonus: ", err);
    }
}

export const filterOrderHistory = async({ pageIndex, pageSize, fromDate, toDate }) => {
    try {
        const response = await httprequest.get('buyer-filter-receipt', { params: { pageIndex, pageSize, fromDate, toDate } });
        return response?.data;
    } catch (err) {
        console.log("Error when filtering bonus: ", err);
    }
}