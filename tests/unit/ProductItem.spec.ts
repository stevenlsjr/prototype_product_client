import ProductItem from "../../src/components/ProductItem.vue";
import { mount, Wrapper } from "@vue/test-utils";
import "../../src/filters";

describe("Product List item component", () => {
  let wrapper: Wrapper<any>;
  const product = { name: "wrench", upc: "0001", pricePerItem: 10 };
  beforeEach(() => {
    wrapper = mount(ProductItem, {
      propsData: {
        product
      }
    });
  });

  test("is a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  test("contains product name in html", () => {
    expect(wrapper.html().search("wrench")).not.toEqual(-1);
  });

  test("contains price information", () => {
    expect(wrapper.html().search("10.00")).not.toEqual(-1);
  });
});
