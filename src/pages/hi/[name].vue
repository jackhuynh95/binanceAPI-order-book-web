<script setup lang="ts">
const router = useRouter()
const route = useRoute('/hi/[name]')
const user = useUserStore()
const { t } = useI18n()
const { count, inc, dec } = useCounter(5, { min: 5, max: 10 })
const [isSceretMode] = useToggle(false)
const [isRender] = useToggle(true)

function onCompleted(val: string) {
  // eslint-disable-next-line no-alert
  val !== '12345' && window.alert(val)
}

watchEffect(() => {
  user.setNewName(route.params.name)
})

watchDebounced(count, () => {
  isRender.value = false

  // delay time 500ms
  setTimeout(() => {
    isRender.value = true
  }, 500)
}, { debounce: 500, maxWait: 1000 })
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-pedestrian inline-block />
    </div>
    <p>
      {{ t('intro.hi', { name: user.savedName }) }}
    </p>

    <p mb-5 text-sm opacity-75>
      <em>{{ t('intro.pin-input') }}</em>
    </p>

    <ThePINInput v-if="isRender" model-value="12345" :length="count" :secure="isSceretMode" :blur-on-complete="true" text-sm opacity-75 @completed="onCompleted" />
    <ThePINInput v-else model-value="" :length="count" :secure="true" pointer-events-none text-sm opacity-75 />

    <!-- Secret Mode -->
    <div>
      <button
        m="3 t6" text-sm btn
        @click="isSceretMode = !isSceretMode"
      >
        Sceret Mode: {{ isSceretMode ? 'On' : 'Off' }}
      </button>
    </div>

    <!-- Counter -->
    <div flex-inline items-center>
      <button
        m="3 t6" text-sm btn
        @click="() => dec()"
      >
        -
      </button>
      <button m="3 t6" text-sm btn :disabled="true">
        {{ count }}
      </button>
      <button
        m="3 t6" text-sm btn
        @click="() => inc(1)"
      >
        +
      </button>
    </div>

    <template v-if="user.otherNames.length">
      <p mt-4 text-sm>
        <span opacity-75>{{ t('intro.aka') }}:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <RouterLink :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </RouterLink>
          </li>
        </ul>
      </p>
    </template>

    <div>
      <button
        m="3 t6" text-sm btn
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </div>
</template>
