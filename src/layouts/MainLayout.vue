<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer style="height: 100vh; position: fixed">
        <v-container class="d-flex justify-center pa-6">
          <v-icon icon="mdi-bookshelf" size="60"> </v-icon>
        </v-container>
        <v-list nav v-for="item in menuBuilder" :key="item.title">
          <v-list-item
            :to="item.link"
            :prepend-icon="item.icon"
            :title="item.title"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="bg-grey-lighten-4">
        <v-container class="pa-8">
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
interface SideMenuProps {
  title: string;
  icon?: string;
  link?: string;
}

const menuBuilder: SideMenuProps[] = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    link: '/',
  },
  {
    title: 'Usuários',
    icon: 'mdi-account-multiple-outline',
    link: '/users',
  },
  {
    title: 'Livros',
    icon: 'mdi-bookshelf',
    link: '/books',
  },
  {
    title: 'Editoras',
    icon: 'mdi-bookmark-outline',
    link: '/publishers',
  },
  {
    title: 'Alugúeis',
    icon: 'mdi-calendar-multiple',
    link: '/rents',
  },
];
</script>
