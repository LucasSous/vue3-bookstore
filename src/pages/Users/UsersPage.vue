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
        <ButtonComponent title="Adiconar Usuário" prepend-icon="mdi-plus" />
      </v-container>
    </v-col>
  </v-row>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    :fixed-header="true"
    height="60vh"
    items-per-page-text="Items por página"
    items-per-page="10"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2"> mdi-pencil </v-icon>
      <v-icon> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import TextFieldComponent from '@/components/TextFieldComponent.vue';
import { ref } from 'vue';

const search = ref<string>('');

const headers = [
  {
    title: 'Id',
    key: 'id',
  },
  { title: 'Nome', key: 'name' },
  { title: 'E-mail', key: 'email' },
  { title: 'Endereço', key: 'address' },
  { title: 'Actions', key: 'actions', sortable: false },
];

const desserts = [
  {
    id: '1',
    name: 'Lucas Sousa',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '2',
    name: 'João Marcos',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '3',
    name: 'Maria Carla',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '3',
    name: 'Maria Carla',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '3',
    name: 'Maria Carla',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '3',
    name: 'Maria Carla',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '3',
    name: 'Maria Carla',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '3',
    name: 'Maria Carla',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '3',
    name: 'Maria Carla',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '3',
    name: 'Maria Carla',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
  {
    id: '3',
    name: 'Maria Carla',
    email: 'lucas@gmail.com',
    address: 'treze de agosto 47, fortaleza CE',
  },
];

//
</script>
