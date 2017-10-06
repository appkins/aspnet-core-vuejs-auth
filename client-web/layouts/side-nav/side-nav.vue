<template>
  <v-list class="pt-0" dense>
    <v-list-tile>
      <v-list-tile-action>
        <v-icon>chevron_right</v-icon>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider light></v-divider>
    <v-list-tile v-for="item in items" :key="item.title" @click="toggleNav();goTo(item.page);">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class SideNav extends Vue {
        open: boolean;
        items: any = [
          { title: 'Home', icon: 'dashboard', page: '/' },
          { title: 'Contacts', icon: 'question_answer', page: '/contacts' }
        ];
        mini: boolean;
        right: boolean;

        toggleNav() {
          this.open = !this.open;
        };

        toggleMini() {
          this.$emit('mini-nav');
        };

        goTo(link: string) {
          this.$router.push({ path: link });
        };
      }
</script>
<style scoped lang="stylus" src="./side-nav.styl">
</style>
