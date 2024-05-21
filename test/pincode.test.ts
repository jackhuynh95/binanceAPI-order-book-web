import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ThePINInput from '../src/components/ThePINInput.vue'

describe('component ThePINInput.vue', () => {
  it('renders the correct number of pin code cells', async () => {
    const wrapper = mount(ThePINInput, { props: { length: 5, modelValue: '12345' } })

    await nextTick()

    const cellCount = wrapper.findAll('input').length
    expect(cellCount).toBe(5)
  })

  it('displays the correct value when pin code is provided', async () => {
    const wrapper = mount(ThePINInput, { props: { length: 5, modelValue: '12345' } })

    await nextTick()

    const inputValues = wrapper.findAll('input').map(input => input.element.value)
    const expectedValues = ['1', '2', '3', '4', '5']

    expect(inputValues).toEqual(expectedValues)
  })
})
