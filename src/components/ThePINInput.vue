<script lang="ts" setup>
import type { Props } from '~/types/props'

const props = withDefaults(defineProps<Props>(), {
  length: 4,
  autofocus: true,
  secure: false,
  characterPreview: false,
  charPreviewDuration: 300,
  blurOnComplete: false,
})
const emit = defineEmits(['update:modelValue', 'completed'])

const { cells, cellsInputTypes, focusedCellIdx, baseRefName, setRef, onPaste, onCellErase, onInput, onKeyDown } = usePinCode(props, { emit: emit as any })
</script>

<template>
  <div class="inline-flex">
    <input
      v-for="(cell, index) in cells" :key="cell.key" :ref="el => setRef(`${baseRefName}${index}`, el)"
      v-model.trim="cell.value" v-bind="$attrs" :class="`${inputClass}`" :type="cellsInputTypes[index]"
      class="m-3 max-w-40 rounded-md border-none p-10 text-center text-xl font-bold shadow-md outline-none focus:shadow-lg"
      @focus="focusedCellIdx = index" @keydown.delete="onCellErase(index, $event)" @keydown="onKeyDown"
      @paste="onPaste(index, $event)" @input="onInput(index, $event)"
    >
  </div>
</template>
