<template>
  <div>
    <v-data-table
      :headers="props.headers"
      :items="props.books"
      :search="props.search"
      :loading="props.isLoading"
      :fixed-header="true"
      height="60vh"
      items-per-page-text="Itens por página"
      items-per-page="10"
      :items-per-page-options="itemsPerPageOptions"
      loading-text="Carregando dados..."
      no-data-text="Nenhum livro encontrado"
    >
      <template v-slot:item.totalalugado="{ item }">
        <v-chip color="red" v-if="availableCount(item) <= 0">
          {{ availableCount(item) }}
        </v-chip>
        <v-chip color="orange" v-else-if="availableCount(item) < 10">
          {{ availableCount(item) }}
        </v-chip>
        <v-chip color="green" v-else="availableCount(item) < 10">
          {{ availableCount(item) }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" @click="openDialog(item.id)"> mdi-pencil </v-icon>
        <v-icon @click="changeIsOpenConfirmDialog(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <BooksFormDialog
      :is-open-dialog="isOpenDialog"
      @close="closeDialog"
      @updateList="updateList"
      :book-id="bookId"
    />
    <ConfirmDialogComponent
      :is-open-dialog="isOpenConfirmDialog"
      @deleteConfirm="deleteBook"
      @close="changeIsOpenConfirmDialog"
      :is-loading-button="isLoadingDeleteButton"
      dialog-title="Deletar livro"
      :dialog-message="`O livro ${book?.nome} será deletado da base de dados. Deseja realmente deletar?`"
    />
  </div>
</template>

<script lang="ts" setup>
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import { Book } from '@/interfaces/book.interface';
import { ref } from 'vue';
import ConfirmDialogComponent from '@/components/ConfirmDialogComponent.vue';
import { BooksService } from '@/services/books';
import { useSnackbar } from 'vue3-snackbar';
import BooksFormDialog from './BooksFormDialog.vue';

type ReadonlyHeaders = InstanceType<typeof VDataTable>['headers'];

const props = defineProps({
  headers: {
    type: Array as () => ReadonlyHeaders,
    default: () => [],
  },
  books: {
    type: Array as () => Book[],
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

const bookId = ref<string>('');

const book = ref<Book>();

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
  bookId.value = id.toString();
  isOpenDialog.value = true;
};

const closeDialog = (): void => {
  isOpenDialog.value = false;
  bookId.value = '';
};

const changeIsOpenConfirmDialog = (selectedBook?: Book): void => {
  isOpenConfirmDialog.value = !isOpenConfirmDialog.value;
  if (selectedBook) book.value = selectedBook;
};

const updateList = (): void => {
  emit('updateList');
};

const deleteBook = async (): Promise<void> => {
  try {
    isLoadingDeleteButton.value = true;
    if (book.value != null) {
      await BooksService.delete(book.value);
      changeIsOpenConfirmDialog();
      updateList();
      snackbar.add({
        type: 'success',
        text: `Livro deletado com sucesso`,
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

const availableCount = (book: Book): number => {
  return book.quantidade - book.totalalugado;
};
</script>
