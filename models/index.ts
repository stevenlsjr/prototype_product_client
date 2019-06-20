export interface Product {
  url: string
  name: string
  upc: string
  categoryUrls: string[]
  pricePerItem: number
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