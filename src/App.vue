<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <vue3-snackbar bottom left :duration="4000"></vue3-snackbar>
</template>

<script lang="ts" setup>
import { Vue3Snackbar } from 'vue3-snackbar';
//
</script>
