<template>
  <w-app>
    <nav-bar></nav-bar>
    <hr />
    <router-view></router-view>
    <hr />
    <footer-view></footer-view>
  </w-app>
</template>

<script>
import NavBar from "@/components/views/NavBar/NavBar.vue";
import FooterView from "./components/views/FooterView/FooterView.vue";
export default {
  name: "App",
  components: {
    NavBar,
    FooterView,
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
