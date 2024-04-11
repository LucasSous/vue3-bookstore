<template>
  <v-dialog v-model="props.isOpenDialog" width="600px">
    <v-card color="grey-lighten-4" class="pa-6">
      <div class="d-flex flex-row align-center">
        <v-icon icon="mdi-alert-outline" color="red" size="60"></v-icon>
        <div class="pl-6">
          <TitleComponent :title="props.dialogTitle" />
          <p class="dialogMessage">{{ props.dialogMessage }}</p>
        </div>
      </div>
      <div class="d-flex flex-row-reverse pt-6 ga-3">
        <ButtonComponent
          @click="deleteConfirm"
          title="Deletar"
          :loading="props.isLoadingButton"
        />
        <ButtonComponent
          @click="closeDialog"
          title="Cancelar"
          variant="outlined"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import TitleComponent from './TitleComponent.vue';

const props = defineProps({
  isOpenDialog: {
    type: Boolean,
    default: false,
  },
  isLoadingButton: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '',
  },
  dialogMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits();

const closeDialog = (): void => {
  emit('close');
};

const deleteConfirm = (): void => {
  emit('deleteConfirm');
};
</script>

<style>
.dialogMessage {
  color: #727272;
}
</style>
