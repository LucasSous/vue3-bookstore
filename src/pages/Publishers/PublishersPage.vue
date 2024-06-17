<template>
  <v-row justify="end">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-container class="d-flex justify-end align-center px-0">
        <TextFieldComponent
          v-model="search"
          label="Pesquisar"
          prepend-icon="mdi-magnify"
          :hide-details="true"
        />
        <ButtonComponent
          title="Adicionar Editora"
          prepend-icon="mdi-plus"
          @click="openDialog"
        />
      </v-container>
    </v-col>
  </v-row>
  <PublishersList
    :headers="headers"
    :publishers="publishersList"
    :search="search"
    :loading="isLoading"
    @updateList="getPublishers"
  />
  <PublishersFormDialog
    :is-open-dialog="isOpenDialog"
    @close="closeDialog"
    @updateList="getPublishers"
  />
</template>

<script lang="ts" setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import TextFieldComponent from '@/components/TextFieldComponent.vue';
import PublishersList from './components/PublishersList.vue';
import PublishersFormDialog from './components/PublishersFormDialog.vue';
import { onMounted, ref } from 'vue';
import { Publisher } from '@/interfaces/publisher.interface';
import { PublishersService } from '@/services/publishers';
import router from '@/router';

const search = ref<string>('');
const isLoading = ref<boolean>(false);

const headers = [
  { title: 'Id', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Cidade', key: 'cidade' },
  { title: 'Ações', key: 'actions', sortable: false },
];

const publishersList = ref<Publisher[]>([]);

const isOpenDialog = ref<boolean>(false);

const getPublishers = async (): Promise<void> => {
  try {
    isLoading.value = true;
    const response = await PublishersService.get();
    publishersList.value = response;
  } catch (err: any | Error) {
    router.push({ name: 'not-found' });
  } finally {
    isLoading.value = false;
  }
};

const openDialog = (): void => {
  isOpenDialog.value = true;
};

const closeDialog = (): void => {
  isOpenDialog.value = false;
};

onMounted(getPublishers);
</script>
