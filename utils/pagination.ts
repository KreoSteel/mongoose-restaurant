export default function paginate<T>(array: T[], page: number, itemsPerPage: number) {
    const currentPage = page || 1;
    const limit = itemsPerPage || 10;
    const totalPages = Math.ceil(array.length / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArray = array.slice(startIndex, endIndex);

    return {
        totalPages,
        currentPage,
        limit,
        data: paginatedArray,
    }
}