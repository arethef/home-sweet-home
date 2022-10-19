<template>
  <div>
    RegisterPage.vue
    <w-flex column align-center justify-center>
      <w-input class="mb4" label="Email" outline v-model="email"></w-input>
      <w-input
        class="mb4"
        label="Password"
        outline
        v-model="password"
      ></w-input>
      <w-input
        class="mb4"
        label="ConfirmPassword"
        outline
        v-model="confirmPassword"
      ></w-input>
      <w-button class="mt4 mb8" @click="onClickRegisterBtn">Register</w-button>
    </w-flex>
  </div>
</template>

<script>
import http from "@/common/http-common.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      isEqual: false,
    };
  },
  watch: {
    confirmPassword(val) {
      if (this.password === val) this.isEqual = true;
      else this.isEqual = false;
      console.log(
        "RegisterPage.vue watch confirmPassword isEqual: ",
        this.isEqual
      );
    },
  },
  computed: {},
  methods: {
    async onClickRegisterBtn() {
      if (this.isEqual) {
        let userInfo = {
          email: this.email,
          password: this.password,
        };
        await http
          .post("/users/register", userInfo)
          .then((res) => {
            console.log("RegisterPage.vue userRegister res: ", res);
            if (res.data.success) {
              alert(
                "회원가입이 완료되었습니다. 로그인 후 서비스를 이용해주세요"
              );
              this.$router.push("/login");
            }
          })
          .catch((err) => {
            console.log("RegisterPage.vue userRegister err: ", err);
          });
      } else {
        alert("Password and ConfirmPassword are not equal");
      }
    },
  },
};
</script>

<style></style>
