<template>
  <v-text-field
    :label="props.label"
    :placeholder="props.placeholder"
    :prepend-inner-icon="props.prependIcon"
    :value="props.value"
    single-line
    variant="solo"
    hide-details
    density="compact"
    class="mr-4"
  ></v-text-field>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: String,
  placeholder: String,
  prependIcon: String,
  value: String,
});
</script>
