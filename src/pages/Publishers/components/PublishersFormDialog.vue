<template>
  <v-dialog v-model="props.isOpenDialog" width="600px" persistent>
    <v-card color="grey-lighten-4" class="pa-4">
      <v-row class="pb-4 pl-2">
        <v-col>
          <div class="text-h5">{{ dialogTitle() }}</div>
        </v-col>
        <v-col cols="1">
          <v-icon icon="mdi-close" size="20" @click="closeDialog"> </v-icon>
        </v-col>
      </v-row>
      <div v-if="isLoading" class="d-flex justify-center pa-5">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <v-form
        v-else
        v-model="isFormValid"
        fast-fail
        @submit.prevent="formSubmit"
      >
        <v-text-field
          label="Nome"
          placeholder="Nome da editora"
          prepend-inner-icon="mdi-account-outline"
          v-model="publisher.nome"
          :rules="PublisherInputValidators.validateName()"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
        ></v-text-field>
        <v-text-field
          label="Cidade"
          placeholder="Cidade da editora"
          prepend-inner-icon="mdi-map-marker-outline"
          v-model="publisher.cidade"
          :rules="PublisherInputValidators.validateCity()"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
        ></v-text-field>
        <div class="d-flex py-4 px-2 justify-end aling-left">
          <ButtonComponent
            title="Salvar"
            type="submit"
            :disabled="!isFormValid"
            :loading="isButtonLoading"
          />
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import { PublishersService } from '@/services/publishers';
import { Publisher } from '@/interfaces/publisher.interface';
import { watch, ref } from 'vue';
import { useSnackbar } from 'vue3-snackbar';
import PublisherInputValidators from '@/shared/validators/PublisherInputValidators';

const emit = defineEmits();
const props = defineProps({
  isOpenDialog: {
    type: Boolean,
    default: false,
  },
  publisherId: {
    type: String,
    default: null,
  },
});

const snackbar = useSnackbar();

const publisher = ref<Publisher>(<Publisher>{});
const isFormValid = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const isButtonLoading = ref<boolean>(false);

const dialogTitle = (): string => {
  return props.publisherId ? 'Editar Editora' : 'Nova Editora';
};

const closeDialog = (): void => {
  emit('close');
  resetPublisherValue();
};

const resetPublisherValue = (): void => {
  publisher.value = <Publisher>{};
};

const formSubmit = async (): Promise<void> => {
  if (isFormValid.value) {
    if (props.publisherId) {
      await updatePublisher(publisher.value);
    } else {
      await createPublisher(publisher.value);
    }
  }
};

const updateList = (): void => {
  emit('updateList');
};

const getPublisherById = async (publisherId: string): Promise<void> => {
  try {
    isLoading.value = true;
    const response = await PublishersService.getById(publisherId);
    publisher.value = response;
  } catch (err: any | Error) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const createPublisher = async (newPublisher: Publisher): Promise<void> => {
  try {
    isButtonLoading.value = true;
    await PublishersService.create(newPublisher);
    closeDialog();
    updateList();
    snackbar.add({
      type: 'success',
      text: `Editora ${newPublisher.nome} adicionada`,
    });
  } catch (error) {
    snackbar.add({
      type: 'error',
      text: error,
    });
  } finally {
    isButtonLoading.value = false;
  }
};

const updatePublisher = async (newPublisher: Publisher): Promise<void> => {
  try {
    isButtonLoading.value = true;
    await PublishersService.update(newPublisher);
    closeDialog();
    updateList();
    snackbar.add({
      type: 'success',
      text: `Editora editada com sucesso`,
    });
  } catch (error) {
    snackbar.add({
      type: 'error',
      text: error,
    });
  } finally {
    isButtonLoading.value = false;
  }
};

watch(props, async (newProps) => {
  if (newProps.isOpenDialog) {
    if (newProps.publisherId) {
      await getPublisherById(newProps.publisherId);
    }
  }
});
</script>
