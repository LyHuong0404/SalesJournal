import * as httprequest from '../../utils/httprequest';

export const filterBonus = async({ pageIndex, pageSize, orderBy }) => {
    try {
        const filters = { pageSize, pageIndex, orderBy };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('vendor-filter-bonus', { params: filteredParams });
        return response?.data;
    } catch (err) {
        console.log("Error when filtering bonus: ", err);
    }
}