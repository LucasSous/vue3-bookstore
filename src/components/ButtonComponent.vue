<template>
  <v-btn
    :loading="props.loading"
    :disabled="props.disabled"
    :prepend-icon="props.prependIcon"
    :color="props.color"
    :type="props.type"
    :variant="props.variant"
  >
    {{ props.title }}
  </v-btn>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  prependIcon: String,
  loading: Boolean,
  disabled: Boolean,
  type: String,
  class: String,
  variant: {
    type: String as () =>
      | 'flat'
      | 'text'
      | 'elevated'
      | 'tonal'
      | 'outlined'
      | 'plain'
      | undefined,
    default: 'flat',
  },
  color: {
    type: String,
    default: 'primary',
  },
});
</script>
