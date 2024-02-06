<template>
  <v-btn
    :loading="props.loading"
    :disabled="props.disabled"
    :prepend-icon="props.prependIcon"
    :color="props.color"
    :type="props.type"
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
  color: {
    type: String,
    default: 'primary',
  },
});
</script>
