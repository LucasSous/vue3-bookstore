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
          placeholder="Nome do usuário"
          prepend-inner-icon="mdi-account-outline"
          v-model="user.nome"
          :rules="nameRules"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
        ></v-text-field>
        <v-text-field
          label="E-mail"
          placeholder="Ex:. usuario@gmail.com"
          prepend-inner-icon="mdi-email-outline"
          v-model="user.email"
          :rules="emailRules"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
        ></v-text-field>
        <v-text-field
          label="Endereço"
          placeholder="Endereço do usuário"
          prepend-inner-icon="mdi-map-marker-outline"
          v-model="user.endereco"
          :rules="addressRules"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
        ></v-text-field>
        <v-text-field
          label="Cidade"
          placeholder="Cidade do usuário"
          prepend-inner-icon="mdi-map-marker-outline"
          v-model="user.cidade"
          :rules="cityRules"
          single-line
          variant="solo"
          density="compact"
          class="px-2"
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
import { UsersService } from '@/services/users';
import { User } from '@/interfaces/user.interface';
import { watch, ref } from 'vue';
import { useSnackbar } from 'vue3-snackbar';
import {
  invalidEmail,
  invalidValue,
  invalidValueWithSpaces,
  maxCharacters,
  minCharacters,
  requiredValue,
  spacesAtTheStart,
} from '@/utils/ValidationsRules';

const emit = defineEmits();
const props = defineProps({
  isOpenDialog: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    default: null,
  },
});

const snackbar = useSnackbar();

const user = ref<User>({
  id: 0,
  nome: '',
  endereco: '',
  cidade: '',
  email: '',
});
const isFormValid = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const isButtonLoading = ref<boolean>(false);

const nameRules = [
  requiredValue,
  invalidValue,
  invalidValueWithSpaces,
  spacesAtTheStart,
  (value: string) => maxCharacters(value, 30),
  (value: string) => minCharacters(value, 3),
];

const emailRules = [requiredValue, invalidEmail, spacesAtTheStart];

const addressRules = [
  requiredValue,
  spacesAtTheStart,
  (value: string) => maxCharacters(value, 50),
  (value: string) => minCharacters(value, 5),
];

const cityRules = [
  requiredValue,
  invalidValue,
  invalidValueWithSpaces,
  spacesAtTheStart,
  (value: string) => maxCharacters(value, 20),
  (value: string) => minCharacters(value, 3),
];

const dialogTitle = (): string => {
  return props.userId ? 'Editar Usuário' : 'Novo Usuário';
};

const closeDialog = (): void => {
  emit('close');
  resetUserValue();
};

const resetUserValue = (): void => {
  user.value = {
    id: 0,
    nome: '',
    endereco: '',
    cidade: '',
    email: '',
  };
};

const formSubmit = async (): Promise<void> => {
  if (isFormValid.value) {
    if (props.userId) {
      await updateUser(user.value);
    } else {
      await createUser(user.value);
    }
  }
};

const updateList = (): void => {
  emit('updateList');
};

const getUserById = async (userId: string): Promise<void> => {
  try {
    isLoading.value = true;
    const response = await UsersService.getById(userId);
    user.value = response;
  } catch (err: any | Error) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const createUser = async (newUser: User): Promise<void> => {
  try {
    isButtonLoading.value = true;
    await UsersService.create(newUser);
    closeDialog();
    updateList();
    snackbar.add({
      type: 'success',
      text: `Usuário ${newUser.nome} adicionado`,
    });
  } catch (error) {
    snackbar.add({
      type: 'error',
      text: 'Erro ao tentar adicionar usuário',
    });
  } finally {
    isButtonLoading.value = false;
  }
};

const updateUser = async (newUser: User): Promise<void> => {
  try {
    isButtonLoading.value = true;
    await UsersService.update(newUser);
    closeDialog();
    updateList();
    snackbar.add({
      type: 'success',
      text: `Usuário editado com sucesso`,
    });
  } catch (error) {
    snackbar.add({
      type: 'error',
      text: 'Erro ao tentar editar usuário',
    });
  } finally {
    isButtonLoading.value = false;
  }
};

watch(props, async (newProps) => {
  if (newProps.isOpenDialog) {
    if (newProps.userId) {
      await getUserById(newProps.userId);
    }
  }
});
</script>
