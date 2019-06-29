import {
  keysToCamel,
  keysToSnake,
  jsonToProduct,
  Product,
  productToJson,
  specs,
  AuthUser,
  userToJson,
  jsonToUser
} from "@/lib/models";
import { conform, symbol } from "js.spec";

describe("product json entry to js type conversion", () => {
  test("converts objects from snake_case representation to camelCase", () => {
    const val = keysToCamel({
      a_value: 10,
      another_value: "values_arent_converted",
      PascalCaseVal: {
        is_not_nested: null
      }
    });
    expect(val).toMatchObject({
      aValue: 10,
      anotherValue: "values_arent_converted",
      pascalCaseVal: {
        is_not_nested: null
      }
    });
  });

  test("converts camelCase keys to snake_case", () => {
    const val = keysToSnake({
      a_value: 10,
      another_value: "values_arent_converted",
      PascalCaseVal: {
        isNotNested: null
      }
    });
    expect(val).toMatchObject({
      a_value: 10,
      another_value: "values_arent_converted",
      pascal_case_val: {
        isNotNested: null
      }
    });
  });
});

describe("serializing json product value to javascript api", () => {
  test("should produce product with valid data", () => {
    let json: any = {
      url: "http://localhost:8000/api/v1/products/2/",
      pk: 2,
      name: "a hammer",
      upc: "0002",
      price_per_item: "0.000",
      categories: ["http://localhost:8000/api/v1/categories/1/"]
    };
    expect(jsonToProduct(json)).toMatchObject({
      url: "http://localhost:8000/api/v1/products/2/",
      pk: 2,
      name: "a hammer",
      upc: "0002",
      pricePerItem: 0.0,
      categoryUrls: ["http://localhost:8000/api/v1/categories/1/"]
    });

    json = {
      pk: "ima string",
      categories: "should be an iterator"
    };

    expect(() => jsonToProduct(json)).toThrowError();
  });

  test("converting an invalid instance throws an error", () => {});

  test("converting javascript product to json api", () => {
    const product: Product = {
      url: "http://localhost:8000/api/v1/products/2/",
      pk: 2,
      name: "a hammer",
      upc: "0002",
      pricePerItem: 0.0,
      categoryUrls: ["http://localhost:8000/api/v1/categories/1/"]
    };
    let json = productToJson(product);

    expect(json).toMatchObject({
      url: "http://localhost:8000/api/v1/products/2/",
      pk: 2,
      name: "a hammer",
      upc: "0002",
      price_per_item: 0,
      categories: ["http://localhost:8000/api/v1/categories/1/"]
    });

    expect(conform(specs.apiProduct, json)).not.toEqual(symbol.invalid);
  });
});

describe("serializing and deserializing users", () => {
  test("converting user to json", () => {
    const validUsers: AuthUser[] = [
      { username: "bob" },
      { username: "bobby", groups: ["admin"] },
      {
        username: "bobby",
        groupUrls: ["/group/1"],
        groups: ["admin"],
        isStaff: false,
        url: "www.google.com",
        email: "bob@www.google.com"
      }
    ];
    const [a, b, c] = validUsers.map(x => userToJson(x));
    expect(a).toMatchObject({ username: "bob" });
    expect(b).toMatchObject({ username: "bobby" }),
      expect(c).toMatchObject({
        username: "bobby",
        groups: ["/group/1"],
        is_staff: false,
        url: "www.google.com",
        email: "bob@www.google.com"
      });
  });

  test("converting json to users", () => {
    const validJson = [
      {
        url: "http://localhost:8000/api/v1/users/2/",
        pk: 2,
        username: "yogibear",
        email: "",
        groups: [],
        is_staff: false
      },
      {
        url: "http://localhost:8000/api/v1/users/1/",
        pk: 1,
        username: "steve",
        email: "stevenlsjr@email.com",
        groups: [],
        is_staff: true
      }
    ];

    expect(() => validJson.map(js => jsonToUser(js))).not.toThrow();
    const invalidJson = [
      {
        url: 1,
        pk: 2,
        username: "yogibear",
        email: "",
        groups: [],
        is_staff: false
      },
      {
        url: "http://localhost:8000/api/v1/users/1/",
        pk: 1,
        email: "stevenlsjr@email.com",
        groups: [],
        is_staff: true
      }
    ];
    for (let u of invalidJson) {
      expect(() => jsonToUser(u)).toThrow();
    }
  });
});
