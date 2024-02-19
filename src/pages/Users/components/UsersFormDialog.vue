<template>
  <v-dialog v-model="props.isOpenDialog" width="600px" persistent>
    <v-card color="grey-lighten-4" class="pa-4">
      <v-row class="pb-4 pl-2">
        <v-col>
          <div class="text-h5">Novo Usuário</div>
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

const user = ref<User>({
  id: 0,
  nome: '',
  endereco: '',
  cidade: '',
  email: '',
});
const isFormValid = ref<boolean>(false);
const isLoading = ref<boolean>(false);

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

const formSubmit = (): void => {
  if (isFormValid.value) {
    if (props.userId) {
      console.log('editar');
    } else {
      console.log('salvar');
    }
  }
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

watch(props, async (newProps) => {
  if (newProps.isOpenDialog) {
    if (newProps.userId) {
      await getUserById(newProps.userId);
    }
  }
});
</script>
