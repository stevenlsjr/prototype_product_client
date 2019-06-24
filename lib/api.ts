import { Product, PaginatedList, jsonToProduct } from './models'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import Vue, { PluginObject } from 'vue'

export interface Api {
  products(params: ProductParams): Promise<PaginatedList<Product>>
}

export interface ProductParams {
  limit?: number
  offset?: number
  url?: string
}

class ApiImpl implements Api {
  constructor(baseUri: string, axios: NuxtAxiosInstance) {
    this.baseUri = baseUri
    this.axios = axios
    // this.headers = { 'Access-Control-Allow-Origin': '*' }
    this.headers = {}
  }
  private baseUri: string
  private axios: NuxtAxiosInstance
  private headers: { [key: string]: string }

  /**
   *
   * @param limit max results per page
   * @param offset page offset
   */
  async products({ limit, offset, url }): Promise<PaginatedList<Product>> {
    let res: any = null
    if (url) {
      res = await this.axios.$get(url, { headers: this.headers })
    } else {
      url = this.baseUri + '/api/v1/products'
      res = await this.axios.$get(url, {
        params: {
          limit,
          offset
        },
        headers: this.headers
      })
    }
    const productResults = (res.results as any[]).map(jsonToProduct)

    return {
      result: productResults,
      limit,
      offset,
      nextUri: res.next,
      previousUri: res.previous
    }
  }
}

export function api(axios: NuxtAxiosInstance): Api {
  const baseUri = process.env['PRODUCT_API_BACKEND'] || 'http://localhost:8000'
  return new ApiImpl(baseUri, axios)
}
