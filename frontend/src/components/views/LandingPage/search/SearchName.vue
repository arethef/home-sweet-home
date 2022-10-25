<template>
  <div>
    <!-- <p>SearchName.vue</p> -->
    <w-input
      v-model="houseName"
      label="아파트 이름을 입력하세요"
      outline
    ></w-input>
    <w-button class="mt4 mb8" @click="getNameHouseInfoList">검색</w-button>
    <house-info-table
      :curr-house-info-list="currNameHouseInfoList"
    ></house-info-table>
  </div>
</template>

<script>
// import http from "@/common/http-common.js";
// import { dongcodeStore } from "@/store/store.js";
import { nameHouseInfoList } from "@/api/houseinfo.js";
import HouseInfoTable from "@/components/views/LandingPage/HouseInfoTable";
export default {
  name: "SearchName",
  components: {
    HouseInfoTable,
  },
  data() {
    return {
      houseName: null,
      currNameHouseInfoList: null,
    };
  },
  created() {},
  unmounted() {},
  watch: {},
  computed: {},
  methods: {
    async getNameHouseInfoList() {
      console.log("SearchName.vue methods getNameHouseInfoList called");
      await nameHouseInfoList(this.houseName).then((res) => {
        console.log("SearchName.vue methods getNameHouseInfoList res: ", res);
        this.currNameHouseInfoList = res;
      });
      console.log(
        "SearchName.vue methods getNameHouseInfoList this.currNameHouseInfoList: ",
        this.currNameHouseInfoList
      );
    },
  },
};
</script>

<style scoped>
</style>
