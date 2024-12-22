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
          title="Adicionar Livro"
          prepend-icon="mdi-plus"
          @click="openDialog"
        />
      </v-container>
    </v-col>
  </v-row>
  <BooksList
    :headers="headers"
    :books="booksList"
    :search="search"
    :loading="isLoading"
    @updateList="getBooks"
  />
  <BooksFormDialog
    :is-open-dialog="isOpenDialog"
    @close="closeDialog"
    @updateList="getBooks"
  />
</template>

<script lang="ts" setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import TextFieldComponent from '@/components/TextFieldComponent.vue';
import { BooksService } from '@/services/books';
import { Book } from '@/interfaces/book.interface';
import { ref, onMounted } from 'vue';
import router from '@/router';
import BooksList from './components/BooksList.vue';
import BooksFormDialog from './components/BooksFormDialog.vue';

const search = ref<string>('');
const isLoading = ref<boolean>(false);

const headers = [
  { title: 'Id', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Autor', key: 'autor' },
  { title: 'Editora', key: 'editora.nome' },
  { title: 'Lançamento', key: 'lancamento' },
  { title: 'Quantidade', key: 'quantidade' },
  { title: 'Disponíveis', key: 'totalalugado' },
  { title: 'Ações', key: 'actions', sortable: false },
];

const booksList = ref<Book[]>([]);

const isOpenDialog = ref<boolean>(false);

const getBooks = async (): Promise<void> => {
  try {
    isLoading.value = true;
    const response = await BooksService.get();
    booksList.value = response;
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

onMounted(getBooks);
</script>
