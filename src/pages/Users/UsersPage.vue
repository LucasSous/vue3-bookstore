<template>
  <TitleComponent title="Usuários" />
  <v-row justify="end">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-container class="d-flex justify-end align-center px-0">
        <TextFieldComponent
          v-model="search"
          label="Pesquisar"
          prepend-icon="mdi-magnify"
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
  />
  <v-dialog v-model="isOpenDialog" width="600px">
    <v-card color="grey-lighten-4" class="pa-4">
      <v-row class="pb-4 pl-2">
        <v-col>
          <div class="text-h5">Novo Usuário</div>
        </v-col>
        <v-col cols="1">
          <v-icon icon="mdi-close" size="20" @click="closeDialog"> </v-icon>
        </v-col>
      </v-row>
      <TextFieldComponent
        label="Nome"
        placeholder="Nome do usuário"
        prepend-icon="mdi-account-outline"
      />
      <TextFieldComponent
        label="E-mail"
        placeholder="Ex:. usuario@gmail.com"
        prepend-icon="mdi-email-outline"
      />
      <TextFieldComponent
        label="Endereço"
        placeholder="Endereço do usuário"
        prepend-icon="mdi-map-marker-outline"
      />
      <TextFieldComponent
        label="Cidade"
        placeholder="Cidade do usuário"
        prepend-icon="mdi-map-marker-outline"
      />
      <div class="d-flex py-4 px-2 justify-end aling-left">
        <ButtonComponent title="Salvar" @click="closeDialog" />
      </div>
    </v-card>
  </v-dialog>
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
