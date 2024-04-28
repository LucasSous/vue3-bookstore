<template>
  <div>
    <v-data-table
      :headers="props.headers"
      :items="props.publishers"
      :search="props.search"
      :loading="props.isLoading"
      :fixed-header="true"
      height="60vh"
      items-per-page-text="Itens por página"
      items-per-page="10"
      :items-per-page-options="itemsPerPageOptions"
      loading-text="Carregando dados..."
      no-data-text="Nenhuma editora encontrada"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" @click="openDialog(item.id)"> mdi-pencil </v-icon>
        <v-icon @click="changeIsOpenConfirmDialog(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <PublishersFormDialog
      :is-open-dialog="isOpenDialog"
      @close="closeDialog"
      @updateList="updateList"
      :publisher-id="publisherId"
    />
    <ConfirmDialogComponent
      :is-open-dialog="isOpenConfirmDialog"
      @deleteConfirm="deletePublisher"
      @close="changeIsOpenConfirmDialog"
      :is-loading-button="isLoadingDeleteButton"
      dialog-title="Deletar editora"
      :dialog-message="`A editora ${publisher?.nome} será deletada da base de dados. Deseja realmente deletar?`"
    />
  </div>
</template>

<script lang="ts" setup>
import PublishersFormDialog from './PublishersFormDialog.vue';
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import { ref } from 'vue';
import ConfirmDialogComponent from '@/components/ConfirmDialogComponent.vue';
import { PublishersService } from '@/services/publishers';
import { useSnackbar } from 'vue3-snackbar';
import { Publisher } from '@/interfaces/publisher.interface';

type ReadonlyHeaders = InstanceType<typeof VDataTable>['headers'];

const props = defineProps({
  headers: {
    type: Array as () => ReadonlyHeaders,
    default: () => [],
  },
  publishers: {
    type: Array as () => Publisher[],
    default: () => [],
  },
  search: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits();

const publisherId = ref<string>('');

const publisher = ref<Publisher>();

const isOpenDialog = ref<boolean>(false);

const isOpenConfirmDialog = ref<boolean>(false);

const isLoadingDeleteButton = ref<boolean>(false);

const itemsPerPageOptions = <(number | { title: string; value: number })[]>[
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: -1, title: 'Tudo' },
];

const snackbar = useSnackbar();

const openDialog = (id: number): void => {
  publisherId.value = id.toString();
  isOpenDialog.value = true;
};

const closeDialog = (): void => {
  isOpenDialog.value = false;
  publisherId.value = '';
};

const changeIsOpenConfirmDialog = (selectedPublisher?: Publisher): void => {
  isOpenConfirmDialog.value = !isOpenConfirmDialog.value;
  if (selectedPublisher) publisher.value = selectedPublisher;
};

const updateList = (): void => {
  emit('updateList');
};

const deletePublisher = async (): Promise<void> => {
  try {
    isLoadingDeleteButton.value = true;
    if (publisher.value != null) {
      await PublishersService.delete(publisher.value);
      changeIsOpenConfirmDialog();
      updateList();
      snackbar.add({
        type: 'success',
        text: `Editora deletada com sucesso`,
      });
    }
  } catch (error) {
    snackbar.add({
      type: 'error',
      text: error,
    });
  } finally {
    isLoadingDeleteButton.value = false;
  }
};
</script>
