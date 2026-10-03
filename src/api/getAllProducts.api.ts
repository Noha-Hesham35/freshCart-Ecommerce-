export interface ProductFilters {
    category?: string
    brand?: string
    keyword?: string
    limit?: number
    page?: number
}

export const getAllProducts = async (filters?: ProductFilters) => {
    let url = `https://ecommerce.routemisr.com/api/v1/products`
    if (filters) {
        const params = new URLSearchParams()
        if (filters.category) params.append("category[in]", filters.category)
        if (filters.brand) params.append("brand", filters.brand)
        if (filters.keyword) params.append("keyword", filters.keyword)
        if (filters.limit) params.append("limit", filters.limit.toString())
        if (filters.page) params.append("page", filters.page.toString())
        const qs = params.toString()
        if (qs) url += `?${qs}`
    }
    const response = await fetch(url)
    const data = await response.json()
    return data
}