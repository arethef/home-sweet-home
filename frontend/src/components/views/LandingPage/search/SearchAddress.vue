<template>
  <div>
    <!-- <p>SearchAddress.vue</p> -->
    <w-flex>
      <w-select :items="sidos" v-model="currSidoName" outline>시/도</w-select>
      <w-select :items="guguns" v-model="currGugunName" outline>구/군</w-select>
      <w-select :items="dongs" v-model="currDongName" outline>동</w-select>
    </w-flex>
    <w-button class="mt4 mb8" @click="getAddressHouseInfoList">검색</w-button>
    <house-info-table
      :curr-house-info-list="currAddressHouseInfoList"
    ></house-info-table>
  </div>
</template>

<script>
// import http from "@/common/http-common.js";
// import { dongcodeStore } from "@/store/store.js";
import { houseinfoStore, dongcodeStore } from "@/store/store.js";
import { sidoList, gugunList, dongList, dongInfo } from "@/api/dongcode.js";
import { addressHouseInfoList } from "@/api/houseinfo.js";
import { mapActions, mapGetters, mapState } from "vuex";
import HouseInfoTable from "@/components/views/LandingPage/HouseInfoTable";
export default {
  name: "SearchAddress",
  components: {
    HouseInfoTable,
  },
  data() {
    return {
      currSidoName: null,
      currGugunName: null,
      currDongName: null,
      sidos: [],
      guguns: [],
      dongs: [],
      currDongCode: null,
      currAddressHouseInfoList: null,
    };
  },
  created() {
    this.getSidoList();
  },
  unmounted() {},
  watch: {
    currSidoName() {
      console.log("SearchAddress.vue watch currSidoName: ", this.currSidoName);
      this.currGugunName = null;
      this.guguns = [];
      this.currDongName = null;
      this.dongs = [];
      this.getGugunList();
      return this.currSidoName;
    },
    currGugunName() {
      console.log(
        "SearchAddress.vue watch currGugunName: ",
        this.currGugunName
      );
      this.currDongName = null;
      this.dongs = [];
      this.getDongList();
      return this.currGugunName;
    },
    currDongName() {
      console.log("SearchAddress.vue watch currDongName: ", this.currDongName);
      this.getDongInfo();
      return this.currDongName;
    },
  },
  computed: {
    ...mapState(houseinfoStore, ["houseInfoList"]),
    ...mapGetters(houseinfoStore, ["getHouseInfoList"]),
    ...mapState(dongcodeStore, [
      "sidoNameSelected",
      "gugunNameSelected",
      "dongNameSelected",
      "dongCodeSelected",
    ]),
    ...mapGetters(dongcodeStore, [
      "getSidoNameSelected",
      "getGugunNameSelected",
      "getDongNameSelected",
      "getDongCodeSelected",
    ]),
  },
  methods: {
    ...mapActions(houseinfoStore, ["setHouseInfoList"]),
    ...mapActions(dongcodeStore, [
      "setSidoNameSelected",
      "setGugunNameSelected",
      "setDongNameSelected",
      "setDongCodeSelected",
    ]),
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
      await gugunList(this.currSidoName).then((res) => {
        console.log("SearchAddress.vue methods getGugunList res: ", res);
        res.forEach((gugun) => {
          this.guguns.push({ label: gugun });
        });
      });
    },
    async getDongList() {
      console.log("SearchAddress.vue methods getDongList called");
      await dongList(this.currGugunName, this.currSidoName).then((res) => {
        console.log("SearchAddress.vue methods getDongList res: ", res);
        res.forEach((dong) => {
          this.dongs.push({ label: dong });
        });
      });
    },
    async getDongInfo() {
      console.log("SearchAddress.vue methods getDongInfo called");
      await dongInfo(
        this.currDongName,
        this.currGugunName,
        this.currSidoName
      ).then((res) => {
        console.log("SearchAddress.vue methods getDongInfo res: ", res);
        this.currDongCode = res.dongCode;
      });
      console.log(
        "SearchAddress.vue methods this.currDongCode: ",
        this.currDongCode
      );
    },
    async getAddressHouseInfoList() {
      await addressHouseInfoList(this.currDongCode).then((res) => {
        console.log(
          "SearchAddress.vue methods getAddressHouseInfoList res: ",
          res
        );
        this.currAddressHouseInfoList = res;
      });
      console.log(
        "SearchAddress.vue methods getAddressHouseInfoList this.currAddressHouseInfoList: ",
        this.currAddressHouseInfoList
      );
      this.setHouseInfoList(this.currAddressHouseInfoList);
      console.log(
        "SearchAddress.vue methods getAddressHouseInfoList this.getHouseInfoList: ",
        this.getHouseInfoList
      );
      this.setSidoNameSelected(this.currSidoName);
      this.setGugunNameSelected(this.currGugunName);
      this.setDongNameSelected(this.currDongName);
      this.setDongCodeSelected(this.currDongCode);
    },
  },
};
</script>

<style></style>
