import { mount } from '@vue/test-utils'

import PageLimitInput from '../components/PageLimitInput.vue'

describe('PageLimitInput component', () => {
  const props = { max: 40, min: 10, value: 20 }
  let wrapper = null
  beforeEach(() => {
    wrapper = mount(PageLimitInput, {
      propsData: props
    })
    wrapper
  })
  test('should mount with standard valid properties', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
    expect(wrapper.find('input')).toBeTruthy()
  })
  test('it should indicate invalid prop values', () => {
    wrapper.setProps({ value: 0 })
    expect(wrapper.vm.isValid).toBeFalsy()
    wrapper.setProps({ value: 100 })
    expect(wrapper.vm.isValid).toBeFalsy()
    wrapper.setProps({ value: 30 })
    expect(wrapper.vm.isValid).toBeTruthy()
  })
  test('it should emit input events', () => {
    wrapper.setProps({ value: 30 })
    const input = wrapper.find('input')
    input.element.value = 31
    input.trigger('input')
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0]).toEqual([31])
  })
  test('it should not emit input events with invalid data', () => {
    wrapper.setProps({ value: 30 })
    const input = wrapper.find('input')
    input.element.value = 0
    input.trigger('input')
    expect(wrapper.emitted().input).toBeFalsy()
    input.element.value = 100
    input.trigger('input')
    expect(wrapper.emitted().input).toBeFalsy()
  })
})
