<template>
  <div>
    <v-data-table
      :headers="props.headers"
      :items="props.users"
      :search="props.search"
      :loading="props.isLoading"
      :fixed-header="true"
      height="60vh"
      items-per-page-text="Itens por página"
      items-per-page="10"
      :items-per-page-options="itemsPerPageOptions"
      loading-text="Carregando dados..."
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" @click="openDialog(item.id)"> mdi-pencil </v-icon>
        <v-icon @click="changeIsOpenConfirmDialog(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <UsersFormDialog
      :is-open-dialog="isOpenDialog"
      @close="closeDialog"
      @updateList="updateList"
      :user-id="userId"
    />
    <ConfirmDialogComponent
      :is-open-dialog="isOpenConfirmDialog"
      @deleteConfirm="deleteUser"
      @close="changeIsOpenConfirmDialog"
      :is-loading-button="isLoadingDeleteButton"
      dialog-title="Deletar usuário"
      :dialog-message="`O usuário ${user?.nome} será deletado da base de dados. Deseja realmente deletar?`"
    />
  </div>
</template>

<script lang="ts" setup>
import UsersFormDialog from './UsersFormDialog.vue';
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import { User } from '@/interfaces/user.interface';
import { ref } from 'vue';
import ConfirmDialogComponent from '@/components/ConfirmDialogComponent.vue';
import { UsersService } from '@/services/users';
import { useSnackbar } from 'vue3-snackbar';

type ReadonlyHeaders = InstanceType<typeof VDataTable>['headers'];

const props = defineProps({
  headers: {
    type: Array as () => ReadonlyHeaders,
    default: () => [],
  },
  users: {
    type: Array as () => User[],
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

const userId = ref<string>('');

const user = ref<User>();

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
  userId.value = id.toString();
  isOpenDialog.value = true;
};

const closeDialog = (): void => {
  isOpenDialog.value = false;
  userId.value = '';
};

const changeIsOpenConfirmDialog = (selectedUser?: User): void => {
  isOpenConfirmDialog.value = !isOpenConfirmDialog.value;
  if (selectedUser) user.value = selectedUser;
};

const updateList = (): void => {
  emit('updateList');
};

const deleteUser = async (): Promise<void> => {
  try {
    isLoadingDeleteButton.value = true;
    if (user.value != null) {
      await UsersService.delete(user.value);
      changeIsOpenConfirmDialog();
      updateList();
      snackbar.add({
        type: 'success',
        text: `Usuário deletado com sucesso`,
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
