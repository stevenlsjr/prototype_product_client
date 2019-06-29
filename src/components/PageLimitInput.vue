<template>
  <div>
    <label for="page-limit">Items Per Page</label>

    <input
      type="number"
      :name="name"
      :min="min"
      :max="max"
      :value="value"
      @input="onInput"
      @change="onInput"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
/**
 * Wrapper component for validated numerical input
 * prevents the "on-input" event from firing if value is not within min and max properties
 */
@Component({})
class InputPageLimit extends Vue {
  @Prop(String) name!: string;
  @Prop(Number) max!: number;
  @Prop(Number) min!: number;
  @Prop(Number) value!: number;

  get isValid(): boolean {
    return (
      this.max > this.min && this.value <= this.max && this.min <= this.value
    );
  }

  onInput(event: any) {
    const value = parseInt(event.target.value, 10);
    if (this.min <= value && value <= this.max) {
      this.$emit("input", value);
    }
  }
}
export default InputPageLimit;
</script>
