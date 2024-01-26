<template>
  <h1 class="font-weight-regular">{{ props.title }}</h1>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
});
</script>
