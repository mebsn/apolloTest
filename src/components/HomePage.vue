<template>
  <b-container class="d-flex flex-column align-items-center">
    <b-container class="bg-primary rounded w-75 mt-4 mb-3"
      ><b-button
        @click="adduser()"
        variant="success border border-warning border-2 my-4"
      >
        + Add User</b-button
      ></b-container
    >
    <div class="row">
      <div
        v-for="user in getUsersArray"
        :key="user.id"
        class="col-lg-4"
      >
        <div
          class="d-flex flex-column align-items-center border border-success border-2 rounded m-2 text-success"
        >
          <div class="m-2 mt-4">Username: {{ user.username }}</div>
          <div class="m-2 mt-2">
            First Name: {{ user.name.replace("Mrs. ", "").split(" ")[0] }}
          </div>
          <div class="m-2 mt-2">
            Last Name: {{ user.name.replace("Mrs. ", "").split(" ")[1] }}
          </div>
          <div class="m-2 mt-2">Email: {{ user.email }}</div>
          <div
            v-if="!confirmation"
            class="w-50 mt-4 mb-2 d-flex flex-row align-items-center justify-content-between"
          >
            <b-button
              @click="edit(user.id)"
              variant="primary border border-warning border-2"
              >Edit</b-button
            ><b-button
              @click="deleteUser()"
              variant="danger border border-warning border-2"
              >Delete</b-button
            >
          </div>
          <div
            v-if="confirmation"
            class="w-50 mt-4 d-flex flex-row align-items-center justify-content-between mb-4"
          >
            <b-button
              @click="handleDelete(user.id)"
              variant="danger border border-warning border-2"
              >Confirm</b-button
            ><b-button
              @click="cancelDelete()"
              variant="primary border border-warning border-2"
              >Cancel</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <ul class="pagination mt-5">
    <li class="page-item" v-bind:class="{ active: activeClass1 }">
      <a class="page-link" href="#" @click="handleFirstPage()">1</a>
    </li>
    <li class="page-item"  v-bind:class="{ active: activeClass2 }"><a class="page-link" href="#"  @click="handleSecondPage()">2</a></li>
  </ul>
  </b-container>
</template>

<script>
import axios from "@/utilis/axiosInstance";

export default {
  name: "HomePage",
  data() {
    return {
      confirmation: false,
      currentPage: 1,
      activeClass2: false,
      activeClass1: true,
    };
  },
  computed: {
    getUsersArray() {
      return this.sortForPagination(this.$store.state.user.users, this.currentPage);
    },
  },
  methods: {
    sortForPagination(array, currentPage) {
      if ( currentPage === 1) {
      return array.splice(0,5);
      }
      else if ( currentPage === 2) {
        return array.splice(0,5);
      }
    },
    handleSecondPage(){
      this.currentPage = 2;
      this.activeClass1 = false;
      this.activeClass2 = true;
    },
    handleFirstPage(){
      this.currentPage = 1;
      this.$store.dispatch("LOAD_USERS");
        this.activeClass1 = true;
      this.activeClass2 = false;
    },
    deleteUser() {
      this.confirmation = true;
    },
    cancelDelete() {
      this.confirmation = false;
    },
    adduser() {
      this.$router.push("/addNewUser");
    },
    async handleDelete(id) {
      try {
        const res = await axios.delete(`/users/${id}`);
        console.log(res);
        this.confirmation = false;
      } catch (err) {
        throw new Error(err);
      }
    },
    edit(id) {
      this.$router.push({ name: "EditUser", params: { id: id } });
    },
  },
  created() {
    try {
      this.$store.dispatch("LOAD_USERS");
    } catch (err) {
      throw new Error(err);
    }

  },
};
</script>
<style lang="scss" scoped></style>
