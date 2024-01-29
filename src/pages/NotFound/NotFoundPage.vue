<template>
  <div
    class="d-flex flex-column justify-center align-center"
    style="height: 100%"
  >
    <v-icon icon="mdi-emoticon-sad-outline" size="100"> </v-icon>
    <div style="font-size: 15vh">404</div>
    <div class="mb-4">Oops. Page not found!</div>
    <ButtonComponent title="Voltar para o inicio" @click="goToHome" />
  </div>
</template>

<script lang="ts" setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import router from '@/router';

const goToHome = (): void => {
  router.push({ path: '/' });
};
</script>
