<template>
  <div>
    <p>SearchAddress.vue</p>
    <w-flex>
      <w-select :items="sidos" v-model="currSido" outline>시/도</w-select>
      <w-select :items="guguns" v-model="currGugun" outline>구/군</w-select>
      <w-select :items="dongs" v-model="currDong" outline>동</w-select>
    </w-flex>
    <w-button class="mt4 mb8" @click="getAddressHouseList">검색</w-button>
    <!-- <w-button class="mt4 mb8" @click="onClickSeoulBtn">Seoul</w-button>
    <w-button class="mt4 mb8" @click="onClickSeongdongBtn">Seongdong</w-button> -->
  </div>
</template>

<script>
// import http from "@/common/http-common.js";
// import { dongcodeStore } from "@/store/store.js";
import { houseinfoStore } from "@/store/store.js";
import { sidoList, gugunList, dongList, dongInfo } from "@/api/dongcode.js";
import { addressHouseList } from "@/api/houseinfo.js";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "SearchAddress",
  data() {
    return {
      currSido: null,
      currGugun: null,
      currDong: null,
      sidos: [],
      guguns: [],
      dongs: [],
      currDongCode: null,
      currAddressHouseList: null,
    };
  },
  created() {
    this.getSidoList();
  },
  unmounted() {},
  watch: {
    currSido() {
      console.log("SearchAddress.vue watch currSido: ", this.currSido);
      this.currGugun = null;
      this.guguns = [];
      this.currDong = null;
      this.dongs = [];
      this.getGugunList();
      return this.currSido;
    },
    currGugun() {
      console.log("SearchAddress.vue watch currGugun: ", this.currGugun);
      this.currDong = null;
      this.dongs = [];
      this.getDongList();
      return this.currGugun;
    },
    currDong() {
      console.log("SearchAddress.vue watch currDong: ", this.currDong);
      this.getDongInfo();
      return this.currDong;
    },
  },
  computed: {
    // ...mapState(dongcodeStore, ["sidoName", "gugunName", "dongName"]),
    ...mapState(houseinfoStore, ["houseList"]),
    ...mapGetters(houseinfoStore, ["getHouseList"]),
  },
  methods: {
    // ...mapActions(dongcodeStore, [
    //   "setSidoName",
    //   "setGugunName",
    //   "setDongName",
    //   "clearSidoName",
    //   "clearGugunName",
    //   "clearDongName",
    // ]),
    ...mapActions(houseinfoStore, ["setHouseList"]),
    async getSidoList() {
      await sidoList().then((res) => {
        console.log("SearchAddress.vue methods getSidoList res: ", res);
        res.forEach((sido) => {
          this.sidos.push({ label: sido });
        });
      });
    },
    async getGugunList() {
      console.log("SearchAddress.vue methods getGugunList called");
      await gugunList(this.currSido).then((res) => {
        console.log("SearchAddress.vue methods getGugunList res: ", res);
        res.forEach((gugun) => {
          this.guguns.push({ label: gugun });
        });
      });
    },
    async getDongList() {
      console.log("SearchAddress.vue methods getDongList called");
      await dongList(this.currGugun, this.currSido).then((res) => {
        console.log("SearchAddress.vue methods getDongList res: ", res);
        res.forEach((dong) => {
          this.dongs.push({ label: dong });
        });
      });
    },
    async getDongInfo() {
      console.log("SearchAddress.vue methods getDongInfo called");
      await dongInfo(this.currDong, this.currGugun, this.currSido).then(
        (res) => {
          console.log("SearchAddress.vue methods getDongInfo res: ", res);
          this.currDongCode = res.dongCode;
        }
      );
      console.log(
        "SearchAddress.vue methods this.currDongCode: ",
        this.currDongCode
      );
    },
    async getAddressHouseList() {
      await addressHouseList(this.currDongCode).then((res) => {
        console.log("SearchAddress.vue methods getAddressHouseList res: ", res);
        this.currAddressHouseList = res;
      });
      console.log(
        "SearchAddress.vue methods getAddressHouseList this.currAddressHouseList: ",
        this.currAddressHouseList
      );
      this.setHouseList(this.currAddressHouseList);
      console.log(
        "SearchAddress.vue methods getAddressHouseList this.getHouseList: ",
        this.getHouseList
      );
      console.log(
        "SearchAddress.vue methods getAddressHouseList this.houseList: ",
        this.houseList
      );
      console.log(
        "SearchAddress.vue methods getAddressHouseList this.houseList[0]: ",
        this.houseList[0]
      );
    },
  },
};
</script>

<style></style>
