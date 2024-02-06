<template>
  <v-text-field
    :label="props.label"
    :placeholder="props.placeholder"
    :prepend-inner-icon="props.prependIcon"
    :rules="rules"
    :value="modelValue"
    @input="$emit('input', $event.target.value)"
    v-bind:="$attrs"
    single-line
    variant="solo"
    :hide-details="props.hideDetails"
    density="compact"
    class="px-2"
  ></v-text-field>
</template>

<script lang="ts" setup>
interface ValidationRule {
  (value: string): boolean | string;
}

const props = defineProps({
  label: String,
  placeholder: String,
  prependIcon: String,
  rules: {
    type: Array as () => ValidationRule[],
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
});
</script>
