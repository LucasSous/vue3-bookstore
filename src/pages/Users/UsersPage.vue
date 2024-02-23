<template>
  <TitleComponent title="Usuários" />
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
          title="Adicionar Usuário"
          prepend-icon="mdi-plus"
          @click="openDialog"
        />
      </v-container>
    </v-col>
  </v-row>
  <UsersList
    :headers="headers"
    :users="usersList"
    :search="search"
    :loading="isLoading"
    @updateList="getUsers"
  />
  <UsersFormDialog
    :is-open-dialog="isOpenDialog"
    @close="closeDialog"
    @updateList="getUsers"
  />
</template>

<script lang="ts" setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import TextFieldComponent from '@/components/TextFieldComponent.vue';
import UsersList from './components/UsersList.vue';
import { UsersService } from '@/services/users';
import { User } from '@/interfaces/user.interface';
import { ref, onMounted } from 'vue';
import router from '@/router';
import UsersFormDialog from './components/UsersFormDialog.vue';

const search = ref<string>('');
const isLoading = ref<boolean>(false);

const headers = [
  { title: 'Id', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'E-mail', key: 'email' },
  { title: 'Endereço', key: 'endereco' },
  { title: 'Cidade', key: 'cidade' },
  { title: 'Ações', key: 'actions', sortable: false },
];

const usersList = ref<User[]>([]);

const isOpenDialog = ref<boolean>(false);

const getUsers = async (): Promise<void> => {
  try {
    isLoading.value = true;
    const response = await UsersService.get();
    usersList.value = response;
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

onMounted(getUsers);
</script>
