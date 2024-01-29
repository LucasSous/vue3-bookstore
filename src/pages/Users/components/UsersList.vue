<template>
  <v-data-table
    :headers="props.headers"
    :items="props.users"
    :search="props.search"
    :loading="props.isLoading"
    :fixed-header="true"
    height="60vh"
    items-per-page-text="Items por página"
    items-per-page="10"
    loading-text="Carregando dados..."
  >
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2"> mdi-pencil </v-icon>
      <v-icon> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import { User } from '@/interfaces/user.interface';
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
</script>
