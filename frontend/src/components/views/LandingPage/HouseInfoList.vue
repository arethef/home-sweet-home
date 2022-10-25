<template>
  <div>
    <p>HouseInfoList.vue</p>
    <w-radios v-model="addressOption" :items="addressOptions" inline></w-radios>
    <w-list
      v-model="currIdxSelected"
      :items="items"
      @item-click="itemClicked = $event"
      class="mt4 mb4"
      hover
    >
      <template #item="{ item }">
        <div id="house-info">
          <w-flex>
            <div class="pal xs6 text-left">{{ item.label }}</div>
            <div class="pal xs6 text-right">{{ item.buildYear }}</div>
          </w-flex>
          <div v-if="this.addressOption === 'Road'" class="text-left">
            {{ item.addressRoad }}
          </div>
          <div v-if="this.addressOption === 'Jibun'" class="text-left">
            {{ item.addressJibun }}
          </div>
        </div>
      </template>
    </w-list>
  </div>
</template>

<script>
import { houseinfoStore, dongcodeStore } from "@/store/store.js";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      currIdxSelected: null,
      items: [],
      itemClicked: null,
      currHouseInfoList: null,
      addressOption: "Road",
      addressOptions: [
        { label: "도로명", value: "Road" },
        { label: "지번", value: "Jibun" },
      ],
    };
  },
  watch: {
    itemClicked() {
      console.log(
        "HouseInfoList.vue watch itemClicked itemClicked: ",
        this.itemClicked
      );
      return this.itemClicked;
    },
    currIdxSelected() {
      console.log(
        "HouseInfoList.vue watch currIdxSelected currIdxSelected: ",
        this.currIdxSelected
      );
      this.$emit("onClickHouseInfoItem", this.currIdxSelected);
      return this.currIdxSelected;
    },
  },
  created() {
    console.log(
      "HouseInfoList.vue created this.getHouseInfoList: ",
      this.getHouseInfoList
    );
    this.setCurrHouseInfoList();
    console.log("HouseInfoList.vue created this.items: ", this.items);
  },
  updated() {
    console.log(
      "HouseInfoList.vue created this.getHouseInfoList: ",
      this.getHouseInfoList
    );
    this.setCurrHouseInfoList();
    console.log("HouseInfoList.vue updated this.items: ", this.items);
  },
  computed: {
    ...mapState(houseinfoStore, ["houseInfoList", "idxSelected"]),
    ...mapGetters(houseinfoStore, ["getHouseInfoList", "getHouseInfoSelected"]),
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
    ...mapActions(houseinfoStore, [
      "clearHouseInfoList",
      "clearHouseInfoSelected",
      "setHouseInfoList",
      "setHouseInfoSelected",
    ]),
    ...mapActions(dongcodeStore, []),
    setCurrHouseInfoList() {
      console.log(
        "HouseInfoList.vue methods setCurrHouseInfoList this.getHouseInfoList: ",
        this.getHouseInfoList
      );
      this.getHouseInfoList.forEach((e) => {
        this.items.push({
          label: e.apartmentName,
          value: e.aptCode,
          addressRoad:
            Number(e.roadNameBubun) === 0
              ? this.getSidoNameSelected
                  .concat(" ")
                  .concat(this.getGugunNameSelected)
                  .concat(" ")
                  .concat(e.roadName)
                  .concat(" ")
                  .concat(Number(e.roadNameBonbun))
              : this.getSidoNameSelected
                  .concat(" ")
                  .concat(this.getGugunNameSelected)
                  .concat(" ")
                  .concat(e.roadName)
                  .concat(" ")
                  .concat(Number(e.roadNameBonbun))
                  .concat("-")
                  .concat(Number(e.roadNameBubun)),
          addressJibun:
            Number(e.bubun) === 0
              ? this.getSidoNameSelected
                  .concat(" ")
                  .concat(this.getGugunNameSelected)
                  .concat(" ")
                  .concat(this.getDongNameSelected)
                  .concat(" ")
                  .concat(Number(e.bonbun))
              : this.getSidoNameSelected
                  .concat(" ")
                  .concat(this.getGugunNameSelected)
                  .concat(" ")
                  .concat(this.getDongNameSelected)
                  .concat(" ")
                  .concat(Number(e.bonbun))
                  .concat("-")
                  .concat(Number(e.bubun)),
          buildYear: e.buildYear,
          lat: e.lat,
          lng: e.lng,
        });
      });
    },
    onClickHouseInfoItem() {
      console.log(
        "HouseInfoList.vue methods onClickHouseInfoItem this.idxSelected: ",
        this.idxSelected
      );
    },
  },
};
</script>

<style scoped>
#house-info {
  width: 100%;
}
</style>