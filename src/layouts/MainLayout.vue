<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :permanent="isPermanentDrawer"
        :temporary="!isPermanentDrawer"
        style="height: 100vh; position: fixed"
      >
        <v-container class="d-flex justify-center pa-6">
          <v-icon icon="mdi-bookshelf" size="60"> </v-icon>
        </v-container>
        <v-list nav v-for="item in menuBuilder" :key="item.title">
          <v-list-item
            :to="item.link"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="changeActivePageTitle(item.title)"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="bg-grey-lighten-4">
        <v-container class="pa-8">
          <v-row align="center" class="pl-2">
            <v-icon @click.stop="changeDrawer" size="30" class="mr-4">{{
              getMenuIcon()
            }}</v-icon>
            <TitleComponent :title="activePageTitle" />
          </v-row>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import TitleComponent from '@/components/TitleComponent.vue';
import { useResponsive } from '@/utils/useResponsive';
import { ref } from 'vue';

interface SideMenuProps {
  title: string;
  icon?: string;
  link?: string;
}

const isPermanentDrawer = useResponsive('(min-width: 1024px)');

const drawer = ref<boolean>();

const activePageTitle = ref<string>('Dashboard');

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

const changeDrawer = (): void => {
  drawer.value = !drawer.value;
};

const changeActivePageTitle = (value: string): void => {
  activePageTitle.value = value;
};

const getMenuIcon = (): String => (drawer.value ? 'mdi-menu-open' : 'mdi-menu');
</script>
