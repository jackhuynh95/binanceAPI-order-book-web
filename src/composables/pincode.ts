import type { Cell, CellInputType, CellsInputTypes } from '~/types/index'
import type { Props } from '~/types/props'
import {
  BASE_REF_NAME,
  CELL_REGEXP,
  DEFAULT_INPUT_TYPE,
  SECURE_INPUT_TYPE,
} from '~/constants/index'

export function usePinCode(props: Props, { emit }: { emit: void }) {
  const baseRefName = ref(BASE_REF_NAME)
  const focusedCellIdx = ref(0)
  const cells = ref<Cell[]>([])
  const watchers = ref<Record<string, Function>>({})
  const cellsInputTypes = ref<CellsInputTypes>({})

  const refs = ref<Record<string, HTMLInputElement>>({})
  function setRef(key: string, el: any) {
    refs.value[key] = el as HTMLInputElement
  }

  const pinCodeComputed = computed(() => cells.value.reduce((pin, cell) => pin + cell.value, ''))

  watch(() => props.modelValue, () => {
    if (props.modelValue)
      onParentValueUpdated()
    else
      reset()
  })

  watch(() => props.length, () => {
    reset()
  })

  watch(() => props.secure, () => {
    switchToSecure()
  })

  watch(pinCodeComputed, (val, oldVal) => {
    emit('update:modelValue', val)
    if (oldVal.length !== props.length && val.length === props.length) {
      emit('completed', val)
      props.blurOnComplete && refs.value[`${baseRefName.value}${focusedCellIdx.value}`]?.blur()
    }
  })

  onMounted(() => {
    init()
    onParentValueUpdated()

    if (props.autofocus)
      nextTick(() => focusCellByIndex())
  })

  // Init methods
  function init() {
    const inputType = getRelevantInputType()
    for (let key = 0; key < (props?.length || 0); key += 1) {
      setCellObject(key)
      setCellInputType(key, inputType)
      setCellWatcher(key)
    }
  }

  function switchToSecure() {
    const inputType = getRelevantInputType()
    for (let key = 0; key < (props?.length || 0); key += 1)
      setCellInputType(key, inputType)
  }

  function setCellObject(key: number) {
    cells.value[key] = { key, value: '' }
  }

  function setCellInputType(index: number, inputType: CellInputType = SECURE_INPUT_TYPE) {
    cellsInputTypes.value[index] = inputType
  }

  function setCellWatcher(index: number) {
    const watchingProperty = `cells.${index}.value`

    watchers.value[watchingProperty] = watch(() => cells.value[index].value, (newVal, oldVal) => {
      onCellChanged(index, newVal, oldVal)
    })
  }

  // Handlers
  function onParentValueUpdated() {
    if (props.modelValue?.length !== props.length) {
      emit('update:modelValue', pinCodeComputed.value)
      return
    }
    props.modelValue
      .split('')
      .forEach((cell: string, idx: number) => {
        cells.value[idx].value = cell || ''
      })
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  function onCellChanged(index: number, newVal: string, oldVal: string) {
    if (!isTheCellValid(newVal, false)) {
      cells.value[index].value = ''
      return
    }
    focusNextCell()
    /* performing character preview if it's enabled */
    if (props.secure && props.characterPreview)
      setTimeout(setCellInputType, props.charPreviewDuration, index)
  }

  function onCellErase(index: number, e: Event) {
    const isThisCellFilled = cells.value[index].value.length
    if (!isThisCellFilled) {
      focusPreviousCell()
      cells.value[focusedCellIdx.value].value = ''
      e.preventDefault()
    }
    else {
      cells.value[index].value = ''
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      /* left arrow key */
      case 37:
        focusPreviousCell()
        break
        /* right arrow key */
      case 39:
        focusNextCell()
        break
      default:
        break
    }
  }

  function onPaste(pasteIdx: number, e: ClipboardEvent) {
    e.preventDefault()
    const pasteValues: string[] = (e.clipboardData as DataTransfer)
      .getData('text/plain')
      .split('')

    let j = 0
    for (let i = pasteIdx; i < pasteIdx + pasteValues.length; i++) {
      if (pasteValues[j] === undefined || cells.value[i] === undefined)
        break
      cells.value[i].value = pasteValues[j]
      j++
    }
  }

  function onInput(pasteIdx: number, ev: Event) {
    const e = ev as InputEvent
    if (e.data?.length === props.length) {
      e.preventDefault()
      const pasteValues: string[] = ((e.data || '').toString()).split('')

      let j = 0
      for (let i = pasteIdx; i < pasteIdx + pasteValues.length; i++) {
        if (pasteValues[j] === undefined || cells.value[i] === undefined)
          break
        cells.value[i].value = pasteValues[j]
        j++
      }
    }
  }

  // Reset methods
  function reset() {
    unwatchCells()
    init()
    focusCellByIndex()
  }

  function unwatchCells() {
    const watchersKeys = Object.keys(watchers.value)
    watchersKeys.forEach(name => watchers.value[name]())
  }

  function isTheCellValid(cell: string, allowEmpty = true): boolean {
    if (!cell)
      return allowEmpty ? cell === '' : false

    return !!cell.match(CELL_REGEXP)
  }

  function getRelevantInputType(): CellInputType {
    return props.secure && !props.characterPreview
      ? SECURE_INPUT_TYPE
      : DEFAULT_INPUT_TYPE
  }

  function focusPreviousCell() {
    if (!focusedCellIdx.value)
      return
    focusCellByIndex(focusedCellIdx.value - 1)
  }

  function focusNextCell() {
    if (focusedCellIdx.value === ((props?.length || 0) - 1))
      return
    focusCellByIndex(focusedCellIdx.value + 1)
  }

  function focusCellByIndex(index: number = 0) {
    const ref = `${baseRefName.value}${index}`
    const el = refs.value[ref]
    if (!el)
      return
    el.focus()
    el.select()
    focusedCellIdx.value = index
  }

  return {
    cells,
    cellsInputTypes,
    focusedCellIdx,
    baseRefName,
    setRef,
    onPaste,
    onCellErase,
    onInput,
    onKeyDown,
  }
}
