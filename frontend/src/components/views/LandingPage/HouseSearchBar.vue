<template>
  <div>
    <!-- <p>HouseSearchBar.vue</p> -->
    <div>
      <p>검색 기준</p>
      <w-radios
        v-model="searchCriteria"
        :items="searchCriterias"
        inline
      ></w-radios>
    </div>
    <search-address
      @on-click-house-info-list-search-btn="onClickHouseInfoListSearchBtn"
      v-if="this.searchCriteria === 'address'"
    ></search-address>
    <search-name v-if="this.searchCriteria === 'name'"></search-name>
  </div>
</template>

<script>
import SearchAddress from "@/components/views/LandingPage/search/SearchAddress.vue";
import SearchName from "@/components/views/LandingPage/search/SearchName.vue";
export default {
  components: {
    SearchAddress,
    SearchName,
  },
  data() {
    return {
      searchCriteria: "address",
      searchCriterias: [
        { label: "주소", value: "address" },
        { label: "이름", value: "name" },
      ],
    };
  },
  methods: {
    onClickHouseInfoListSearchBtn() {
      this.$emit("onClickHouseInfoListSearchBtn");
    },
  },
};
</script>

<style></style>
