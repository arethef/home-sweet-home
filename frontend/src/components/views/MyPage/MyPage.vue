<template>
  <div>
    MyPage
    <w-flex column align-center justify-center>
      <w-button class="mt4" @click="onClickUserInfoBtn">UserInfo</w-button>
      <w-button class="mt4 mb8" @click="onClickAccountWithdrawalBtn"
        >AccountWithdrawal</w-button
      >
    </w-flex>
  </div>
</template>

<script>
import http from "@/common/http-common.js";
import { mapState, mapGetters, mapActions } from "vuex";
import { userStore } from "@/store/store.js";
export default {
  computed: {
    ...mapState(userStore, ["isLoggedIn", "userInfo"]),
    ...mapGetters(userStore, ["getIsLoggedIn", "getUserInfo"]),
  },
  // beforeCreate() {
  //   console.log("MyPage.vue beforeCreat() userInfo: ", this.userInfo);
  //   console.log("MyPage.vue beforeCreat() getUserInfo: ", this.getUserInfo);
  // },
  created() {
    console.log("MyPage.vue created() userInfo: ", this.userInfo);
    console.log("MyPage.vue created() getUserInfo: ", this.getUserInfo);
  },
  // beforeMount() {
  //   console.log("MyPage.vue beforeMount() userInfo: ", this.userInfo);
  //   console.log("MyPage.vue beforeMount() getUserInfo: ", this.getUserInfo);
  // },
  // mounted() {
  //   console.log("MyPage.vue mounted() userInfo: ", this.userInfo);
  //   console.log("MyPage.vue mounted() getUserInfo: ", this.getUserInfo);
  // },
  // updated() {
  //   console.log("MyPage.vue updated() userInfo: ", this.userInfo);
  //   console.log("MyPage.vue updated() getUserInfo: ", this.getUserInfo);
  // },
  methods: {
    ...mapActions(userStore, ["userUserInfo"]),
    async onClickUserInfoBtn() {
      await this.userUserInfo(sessionStorage.getItem("userId"));
    },
    async onClickAccountWithdrawalBtn() {
      console.log("MyPage.vue methods onClickAccountWithdrawalBtn clicked");
      await http
        .delete(`/users/${sessionStorage.getItem("userId")}`)
        .then((res) => {
          console.log(
            "MyPage.vue methods onClickAccountWithdrawalBtn res: ",
            res
          );
          if (res.data.success) {
            alert("회원탈퇴가 완료되었습니다. 감사합니다.");
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(
            "MyPage.vue methods onClickAccountWithdrawalBtn err: ",
            err
          );
        });
    },
  },
};
</script>

<style></style>
