import Vue from "vue";

Vue.filter("dollars", (value: string | number) => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  return value.toFixed(2);
});
