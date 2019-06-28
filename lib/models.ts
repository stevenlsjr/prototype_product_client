export interface AuthUser {
  url: string
  pk: number,
  username: string
  email: string
  groupUrls?: [string]
  groups?: [string]
  isStaff?: [string]
}

export interface Jwt {
  
}

export interface Product {
  url?: string
  name: string
  upc: string
  categoryUrls?: string[]
  pricePerItem: number
}

export interface PaginatedList<Model> {
  limit: number
  offset: number
  count: number
  nextUri?: string
  previousUri?: string
  result: Model[]
}

export function jsonToProduct(json: any): Product {
  const { url, pk, name, upc, price_per_item, categories } = json
  return {
    url,
    name,
    upc,
    pricePerItem: price_per_item,
    categoryUrls: categories
  }
}
