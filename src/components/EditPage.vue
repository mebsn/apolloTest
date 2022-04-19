<template>
  <b-container
    class="userContent d-flex align-items-center justify-content-center"
  >
    <div
      class="w-50 d-flex flex-column align-items-center border border-success border-2 rounded m-2 text-success"
    >
      <div class="m-2 mt-4">
        Username: <input type="text" required v-model="getUser.username" />
      </div>
      <div class="m-2 mt-4">
        Full Name: <input type="text" required v-model="getUser.name" />
      </div>
      <div class="m-2 mt-4">
        Email: <input type="text" required v-model="getUser.email" />
      </div>
      <div
        class="w-50 mt-4 mb-2 d-flex flex-row align-items-center justify-content-center"
      >
        <b-button
          @click="handleEditUser()"
          variant="primary border border-warning border-2"
          >Confirm Edit</b-button
        >
      </div>
      <div v-if="successfulEdit" class="my-2">Successfuly Edited!!</div>
    </div>
  </b-container>
</template>

<script>
import axios from "@/utilis/axiosInstance";

export default {
  name: "EditPage",
  data() {
    return {
      id: this.$route.params.id,
      successfulEdit: false,
    };
  },
  async created() {
    try {
      await this.$store.dispatch("LOAD_USER", this.id);
    } catch (err) {
      throw new Error(err);
    }
  },
  computed: {
    getUser() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    async handleEditUser() {
      try {
        const res = await axios.put(`/users/${this.id}`, {
          username: this.getUser.username,
          name: this.getUser.name,
          email: this.getUser.email,
        });
        this.successfulEdit = true;
        var self = this;
        setTimeout(function () {
          self.$router.push({ path: "/" });
        }, 3000);
        console.log(res);
      } catch (err) {
        alert(err.response.data);
        throw new Error(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.userContent {
  height: 100vh;
}
</style>
