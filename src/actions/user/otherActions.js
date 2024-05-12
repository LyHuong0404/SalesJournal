import * as httprequest from "../../utils/httprequest";


export const filterBonus = async({ pageIndex, pageSize }) => {
    try {
        const response = await httprequest.get('buyer-filter-bonus', { params: { pageIndex, pageSize } });
        return response?.data;
    } catch (err) {
        console.log("Error when filtering bonus: ", err);
    }
}
