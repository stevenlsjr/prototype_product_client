import _ from "lodash";
import { spec, symbol, explainData, conform, explain } from "js.spec";

const monetary = spec.or("monetary", {
  decimalString: spec.string,
  number: spec.number
});

const apiProduct = spec.map("apiProduct", {
  name: spec.string,
  upc: spec.string,
  price_per_item: monetary,
  [symbol.optional]: {
    url: spec.string,
    pk: spec.int,
    categories: spec.collection("array of urls", spec.string)
  }
});

const authUser = spec.map("authUser", {
  username: spec.string,
  [symbol.optional]: {
    url: spec.string,
    pk: spec.integer,
    email: spec.string,
    groups: spec.collection("groups", spec.string),
    is_staff: spec.boolean
  }
});

export const specs = {
  monetary,
  apiProduct,
  authUser
};

export interface AuthUser {
  url?: string;
  pk?: number;
  username: string;
  email?: string;
  groupUrls?: [string];
  groups?: [string];
  isStaff?: boolean;
}

export interface Jwt {
  accept: string;
  refresh: string;
}

export interface Product {
  url?: string;
  pk: number;
  name: string;
  upc: string;
  categoryUrls?: string[];
  pricePerItem: number;
}

export interface PaginatedList<Model> {
  limit: number;
  offset: number;
  count: number;
  nextUri?: string;
  previousUri?: string;
  result: Model[];
}

export interface StringKeyObject<T> {
  [str: string]: T;
}

/**
 * Converts the keys in an object from snake_case or PascalCase to camelCase
 * @param obj an object with String type keys
 */
export function keysToCamel<T = any>(
  obj: StringKeyObject<T>
): StringKeyObject<T> {
  return _.mapKeys<typeof obj>(obj, (value, key) => _.camelCase(key));
}

/**
 * Converts the keys in an object from PascalCase or camelCase to snake_case
 * @param obj an object with String type keys
 */
export function keysToSnake<T = any>(
  obj: StringKeyObject<T>
): StringKeyObject<T> {
  return _.mapKeys<typeof obj>(obj, (value, key) => _.snakeCase(key));
}

/**
 *
 * @param json pojo object representing a product resource
 * from the python api. Should adhere to specs.apiProduct
 */
export function jsonToProduct(json: any & object): Product {
  if (conform(specs.apiProduct, json) == symbol.invalid) {
    throw new Error(
      `data does not conform to product spec: ${explainData(
        specs.apiProduct,
        json
      )}`
    );
  }

  const product = _.transform(
    json,
    (result: any, value, key: string) => {
      let newKey: string;
      if (key === "categories") {
        newKey = "categoryUrls";
      } else {
        newKey = _.camelCase(key);
      }

      if (newKey === "pricePerItem" && typeof value === "string") {
        value = parseFloat(value);
      }
      result[newKey] = value;
    },
    {}
  ) as Product;
  return product;
}

export function productToJson(product: Product): any {
  let js: any = { categories: product.categoryUrls, ...product };
  js = keysToSnake(js);
  return js;
}

/**
 * Converts a user instance to api serializable object
 * @param user user instance
 */
export function userToJson(user: AuthUser): any {
  user.groups = user.groupUrls;
  user.groupUrls = undefined;
  return keysToSnake(user);
}

/**
 * converts an api serializable user object to a javascript user instance
 * @param json an api serializable user object
 */
export function jsonToUser(json: any): AuthUser {
  if (conform(specs.authUser, json) === symbol.invalid) {
    throw new Error(`validation error: ${explainData(specs.authUser, json)}`);
  }
  json.groupUrls = json.groups
  delete json.groups
  const u = keysToCamel(json) as AuthUser;
  
  return u;
}
