<template>
  <div>
    <!-- NavBar.vue -->
    <router-link :to="{ name: 'landingPage' }">LandingPage | </router-link>
    <router-link :to="{ name: 'boardPage' }">BoardPage | </router-link>
    <router-link :to="{ name: 'noticePage' }">NoticePage | </router-link>
    <router-link :to="{ name: 'newsPage' }">NewsPage | </router-link>
    <router-link v-if="!this.getIsLoggedIn" :to="{ name: 'registerPage' }"
      >SignUp |
    </router-link>
    <router-link v-if="!this.getIsLoggedIn" :to="{ name: 'loginPage' }"
      >LogIn
    </router-link>
    <router-link v-if="this.getIsLoggedIn" :to="{ name: 'myPage' }"
      >MyPage |
    </router-link>
    <router-link
      v-if="this.getIsLoggedIn"
      :to="{ name: 'loginPage' }"
      @click="onClickLogOut"
      >LogOut
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { userStore } from "@/store/store.js";
export default {
  components: {},
  computed: {
    ...mapState(userStore, ["isLoggedIn", "userInfo"]),
    ...mapGetters(userStore, ["getIsLoggedIn", "getUserInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userLogOut"]),
    onClickLogOut() {
      console.log("NavBar.vue onClickLogOut");
      this.userLogOut();
    },
  },
};
</script>

<style></style>
