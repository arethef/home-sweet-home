<template>
  <div>
    LoginPage.vue
    <w-flex column align-center justify-center>
      <w-input class="mb4" label="Email" outline v-model="email"></w-input>
      <w-input
        class="mb4"
        label="Password"
        outline
        v-model="password"
      ></w-input>
      <w-button class="mt4 mb8" @click="onClickLogInBtn">LogIn</w-button>
    </w-flex>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { userStore } from "@/store/store.js";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(userStore, ["isLoggedIn", "userInfo"]),
    ...mapGetters(userStore, ["getIsLoggedIn", "getUserInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userLogIn"]),
    async onClickLogInBtn() {
      await this.userLogIn({ email: this.email, password: this.password });
      console.log(
        "LoginPage.vue onClickLoginBtn isLoggedIn: ",
        this.isLoggedIn
      );
      console.log(
        "LoginPage.vue onClickLoginBtn getIsLoggedIn: ",
        this.getIsLoggedIn
      );
      console.log("LoginPage.vue onClickLoginBtn userInfo: ", this.userInfo);
      console.log(
        "LoginPage.vue onClickLoginBtn getUserInfo: ",
        this.getUserInfo
      );
      if (this.isLoggedIn) {
        alert("로그인 성공");
        this.$router.push("/");
      } else {
        alert("로그인 실패");
      }
    },
  },
};
</script>

<style></style>
