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
          placeholder="Nome do livro"
          prepend-inner-icon="mdi-account-outline"
          v-model="book.nome"
          :rules="BookInputValidators.validateName()"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
        ></v-text-field>
        <v-text-field
          label="Autor"
          placeholder="Nome do autor"
          prepend-inner-icon="mdi-head-lightbulb-outline"
          v-model="book.autor"
          :rules="BookInputValidators.validateAutor()"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
        ></v-text-field>
        <v-select
          label="Editora"
          clearable
          placeholder="Selecione uma editora"
          prepend-inner-icon="mdi-bookmark-outline"
          v-model="book.editora"
          :rules="BookInputValidators.validatePublisher()"
          :items="publisherList"
          :item-props="itemProps"
          density="compact"
          single-line
          variant="solo"
          class="px-2"
          :loading="isLoadingPublishers"
        ></v-select>
        <v-text-field
          label="Ano de lançamento"
          placeholder="Ex: 2000"
          prepend-inner-icon="mdi-calendar"
          v-model="book.lancamento"
          :rules="BookInputValidators.validateLaunchYear()"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
          type="number"
        ></v-text-field>
        <v-text-field
          label="Quantidade"
          placeholder="Ex: 99"
          prepend-inner-icon="mdi-numeric"
          v-model="book.quantidade"
          :rules="BookInputValidators.validateQuantity()"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
          type="number"
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
import { BooksService } from '@/services/books';
import { PublishersService } from '@/services/publishers';
import { Book } from '@/interfaces/book.interface';
import { Publisher } from '@/interfaces/publisher.interface';
import { watch, ref, onMounted } from 'vue';
import { useSnackbar } from 'vue3-snackbar';
import BookInputValidators from '@/shared/validators/BookInputValidators';

const emit = defineEmits();
const props = defineProps({
  isOpenDialog: {
    type: Boolean,
    default: false,
  },
  bookId: {
    type: String,
    default: null,
  },
});

const snackbar = useSnackbar();

const book = ref<Book>(<Book>{});

const publisherList = ref<Publisher[]>([]);

const isFormValid = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const isLoadingPublishers = ref<boolean>(false);
const isButtonLoading = ref<boolean>(false);

const dialogTitle = (): string => {
  return props.bookId ? 'Editar Livro' : 'Novo Livro';
};

const closeDialog = (): void => {
  emit('close');
  resetBookValue();
};

const resetBookValue = (): void => {
  book.value = <Book>{};
};

const formSubmit = async (): Promise<void> => {
  if (isFormValid.value) {
    if (props.bookId) {
      await updateBook(book.value);
    } else {
      await createBook(book.value);
    }
  }
};

const updateList = (): void => {
  emit('updateList');
};

const getBookById = async (bookId: string): Promise<void> => {
  try {
    isLoading.value = true;
    const response = await BooksService.getById(bookId);
    book.value = response;
  } catch (err: any | Error) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const createBook = async (newBook: Book): Promise<void> => {
  try {
    isButtonLoading.value = true;
    await BooksService.create(newBook);
    closeDialog();
    updateList();
    snackbar.add({
      type: 'success',
      text: `Livro ${newBook.nome} adicionado`,
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

const updateBook = async (newBook: Book): Promise<void> => {
  try {
    isButtonLoading.value = true;
    await BooksService.update(newBook);
    closeDialog();
    updateList();
    snackbar.add({
      type: 'success',
      text: `Livro editado com sucesso`,
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

const getPublishers = async (): Promise<void> => {
  try {
    isLoadingPublishers.value = true;
    const response = await PublishersService.get();
    publisherList.value = response;
  } catch (err: any | Error) {
    snackbar.add({
      type: 'error',
      text: err,
    });
  } finally {
    isLoadingPublishers.value = false;
  }
};

const itemProps = (item: Publisher) => {
  return {
    title: item.nome,
    value: item,
  };
};

onMounted(getPublishers);

watch(props, async (newProps) => {
  if (newProps.isOpenDialog) {
    if (newProps.bookId) {
      await getBookById(newProps.bookId);
    }
  }
});
</script>
