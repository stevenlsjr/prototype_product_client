import { Product, PaginatedList, jsonToProduct } from './models'
import Vue, { PluginObject } from 'vue'

import {AxiosInstance} from 'axios'

export interface Api {
  products(params: ProductParams): Promise<PaginatedList<Product>>
}

export interface ProductParams {
  limit?: number
  offset?: number
  url?: string
}

const DEFAULT_LIMIT = 50

class ApiImpl implements Api {
  constructor(baseUri: string, axios: AxiosInstance) {
    this.baseUri = baseUri
    this.axios = axios
    // this.headers = { 'Access-Control-Allow-Origin': '*' }
    this.headers = {}
  }
  private baseUri: string
  private axios: AxiosInstance
  private headers: { [key: string]: string }

  /**
   *
   * @param limit max results per page
   * @param offset page offset
   */
  async products({ limit, offset, url }: ProductParams): Promise<PaginatedList<Product>> {
    let res: any = null
    if (url) {
      res = await this.axios.get(url, { headers: this.headers })
    } else {
      url = this.baseUri + '/api/v1/products'
      res = await this.axios.get(url, {
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
      limit: limit || DEFAULT_LIMIT,
      offset: offset || 0,
      nextUri: res.next,
      previousUri: res.previous,
      count: res.count
    }
  }
}

export function api(axios: AxiosInstance): Api {
  const baseUri = process.env['PRODUCT_API_BACKEND'] || 'http://localhost:8000'
  return new ApiImpl(baseUri, axios)
}
