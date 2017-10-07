<template>
  <v-card>
    <v-toolbar class="elevation-1" dark extended>
      <v-text-field prepend-icon="search" hide-details single-line></v-text-field>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="black--text" slot="extension">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
              v-bind:items="rowOptions"
              v-model="rowSelection"
              label="Rows per page"
              single-line
              bottom
            ></v-select>
  </v-toolbar>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="contacts"
      v-bind:pagination.sync="pagination"
      :total-items="totalItems"
      :loading="loading"
      :rows-per-page-items="rowOptions"
      class="elevation-1"
    >
    <template slot="items" scope="props">
      <td>{{ props.item.contactId }}</td>
      <td class="text-xs-right">{{ props.item.email }}</td>
      <td class="text-xs-right">{{ props.item.lastName }}</td>
      <td class="text-xs-right">{{ props.item.phone }}</td>
      <td class="text-xs-right">{{ props.item.firstName }}</td>
    </template>
    </v-data-table>
    <button flat @click="refresh()">Refresh</button>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ContactService, { IContact } from '../services/Contacts';

@Component
export default class Contacts extends Vue {
  contacts: Array<IContact> = [];
  editContact: Object = null;
  isAddMode = false;
  searchQuery: string =  'a';
  totalItems: number = 1;
  loading: boolean = true;
  //pagination = { sortBy: 'contactId', descending: true, page: 1, rowsPerPage: 12};
  pagination: any = {};

  rowOptions: Array<any> = [12, 24, 48];
  rowSelection: number = 12;

  headers = [
    {
      text: 'Id',
      align: 'left',
      sortable: true,
      value: 'contactId'
    },
    { text: 'Email', value: 'email' },
    { text: 'Last Name', value: 'lastName' },
    { text: 'Phone', value: 'phone' },
    { text: 'First Name', value: 'firstName' },
  ];

  created(){
    // this.showAll();


    //this.getDataFromApi();

    //this.getDataFromApi();
    this.$watch('pagination', function(val){
        this.getDataFromApi();
    });
    //this.pagination = { sortBy: 'email', page: 1, rowsPerPage: 12, descending: false, totalItems: 10 }
    // this.$watch('searchQuery', function(val){
    //     this.searchQuery = val;
    //     this.getDataFromApi();
    // })
  }


  getDataFromApi () {
    this.loading = true;
    // return new Promise((resolve, reject) => {
    // const { sortBy, descending, page, rowsPerPage } = this.pagination;
    // }

    let contactService = new ContactService();
    contactService.search(this.searchQuery, this.pagination.rowsPerPage, this.pagination.page, this.pagination.sortBy, !this.pagination.descending)
    .then((response: any) => {
      this.contacts = response.content.contacts;
      this.totalItems = response.content.total;

      // response.content.map((function(data: any) { this.contacts = data.contacts; this.totalItems = data.total;}));
      // It's very important to keep content
      //this.contacts = response.content.map((function(data: any) { return data.contacts; }));
      //this.totalItems = response.content.map((function(data: any) { return data.total; }));
      // this.pagination.rowsPerPage = 12;

    });

      this.loading = false;

  };

  showAll() {
    let contactService = new ContactService();
        contactService.fetchAll().then((response) => {
          this.searchQuery = '';
          this.contacts = response.content;
        });
    };

    refresh() {
      this.pagination = this.pagination;
      this.contacts = this.contacts;
    }


    // onSearch() {
    //   let contactService = new ContactService();
    //     contactService.search(this.searchQuery).then((response) => {
    //       this.contacts = response.content;
    //     });
    // }

    deleteContact(contact: IContact) {
      let contactService = new ContactService();
        contactService.delete(contact.contactId).then((response) => {
            let updatedContacts = this.contacts;
            updatedContacts.splice(updatedContacts.indexOf(contact), 1);
            this.contacts = updatedContacts;
        });
    }

    get hasNoSearchResults() {
     return this.searchQuery && this.contacts && this.contacts.length == 0;
  }

}
</script>

<style scoped lang="stylus">
</style>
