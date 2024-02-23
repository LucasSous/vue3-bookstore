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
      loading-text="Carregando dados..."
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" @click="openDialog(item.id)"> mdi-pencil </v-icon>
        <v-icon> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <UsersFormDialog
      :is-open-dialog="isOpenDialog"
      @close="closeDialog"
      @updateList="updateList"
      :user-id="userId"
    />
  </div>
</template>

<script lang="ts" setup>
import UsersFormDialog from './UsersFormDialog.vue';
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import { User } from '@/interfaces/user.interface';
import { ref } from 'vue';
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

const isOpenDialog = ref<boolean>(false);

const openDialog = (id: number): void => {
  userId.value = id.toString();
  isOpenDialog.value = true;
};

const closeDialog = (): void => {
  isOpenDialog.value = false;
  userId.value = '';
};

const updateList = (): void => {
  emit('updateList');
};
</script>
