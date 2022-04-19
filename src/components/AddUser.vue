<template>
  <b-container
    class="userContent d-flex align-items-center justify-content-center"
  >
    <div
      class="w-50 d-flex flex-column align-items-center border border-success border-2 rounded m-2 text-success"
    >
      <div class="m-2 mt-4">
        Username:
        <input
          type="text"
          required
          placeholder="   UserName"
          v-model="username"
        />
      </div>
      <div class="m-2 mt-4">
        Full Name:
        <input
          type="text"
          required
          placeholder="   FullName"
          v-model="fullname"
        />
      </div>
      <div class="m-2 mt-4">
        Email:
        <input type="text" required placeholder="   Email" v-model="email" />
      </div>
      <div
        class="w-50 mt-4 mb-2 d-flex flex-row align-items-center justify-content-center"
      >
        <b-button
          @click="handleAdduser()"
          variant="primary border border-warning border-2"
          >Add User</b-button
        >
      </div>
      <div v-if="successfulyAdded">New User Successfully Added</div>
    </div>
  </b-container>
</template>

<script>

import axios from "@/utilis/axiosInstance";

export default {
  name: "AddUser",
  data() {
    return {
      username: "",
      fullname: "",
      email: "",
      successfulyAdded:false,
    };
  },
  methods: {
    async handleAdduser() {
      try {
        const res = await axios.post("/users", {
          username: this.username,
          name: this.fullname,
          email: this.email,
        });
        this.successfulyAdded = true;
        console.log(res);
        var self = this;
        setTimeout(function () {
          self.$router.push({ path: "/" });
        }, 3000);
      } catch (err) {
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
