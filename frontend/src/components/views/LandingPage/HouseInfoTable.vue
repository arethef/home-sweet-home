<template>
  <div>
    <!-- <p>HouseInfoTable.vue</p> -->
    <w-table
      :headers="table.headers"
      :items="houseInfoTableList"
      :selectable-rows="table.selectableRows"
      :force-selection="table.forceSelection"
      @row-select="onHouseInfoTableSelected($event)"
    ></w-table>
    <w-overlay
      v-model="showOverlay"
      :persistent="persistent"
      :persistent-no-animation="persistentNoAnimation"
      :opacity="opacity"
    >
      <w-card tile bg-color="white" lg class="ml8 mr8">
        <template #title>
          <w-toolbar>
            <div class="title3">{{ houseInfoTableSelectedAptName }}</div>
            <div class="spacer"></div>
            <span class="ml2">
              <w-icon class="mr2" @click="showOverlay = false">wi-cross</w-icon>
            </span>
          </w-toolbar>
        </template>
        <div class="title4 mb2">아파트 위치</div>
        <kakao-map-house-detail
          :house-lat-lng="houseInfoTableSelectedLatLng"
        ></kakao-map-house-detail>
        <!-- <div id="apt-info" class="mb2">
          <w-table></w-table>
        </div> -->
        <div class="title4 mt4 mb2">거래 내역</div>
        <div id="deal-list" color="white">
          <w-table
            :headers="dealTable.headers"
            :items="houseInfoTableSelectedDealList"
            :selectable-rows="dealTable.selectableRows"
            :force-selection="dealTable.forceSelection"
          ></w-table>
        </div>
      </w-card>
    </w-overlay>
  </div>
</template>

<script>
import { dongcodeStore } from "@/store/store.js";
import { mapGetters, mapState } from "vuex";
import { houseDealList } from "@/api/housedeal.js";
import KakaoMapHouseDetail from "@/components/views/LandingPage/KakaoMapHouseDetail.vue";
export default {
  components: {
    KakaoMapHouseDetail,
  },
  props: {
    currHouseInfoList: {
      type: Array,
    },
  },
  data: () => ({
    houseInfoTableList: [],
    houseInfoTableSelectedAptCode: null,
    houseInfoTableSelected: {},
    houseInfoTableSelectedDealList: [],
    houseInfoTableSelectedAptName: null,
    houseInfoTableSelectedLatLng: {
      lat: null,
      lng: null,
    },
    table: {
      headers: [
        { label: "No", key: "no" },
        { label: "아파트명", key: "apartmentName" },
        { label: "도로명주소", key: "addressRoad" },
        { label: "지번주소", key: "addressJibun" },
        { label: "건축년도", key: "buildYear" },
        // { label: "최근거래", key: "recentDeal" },
      ],
      selectableRows: 1,
      forceSelection: false,
    },
    dealTable: {
      headers: [
        { label: "거래일", key: "dealDate" },
        { label: "거래금액", key: "dealAmount" },
        { label: "면적", key: "area" },
        { label: "층", key: "floor" },
      ],
      selectableRows: false,
      forceSelection: false,
    },
    showOverlay: false,
    opacity: 0.3,
    persistent: false,
    persistentNoAnimation: false,
  }),
  computed: {
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
  created() {
    this.initHouseInfoList();
  },
  updated() {
    this.initHouseInfoList();
  },
  methods: {
    onHouseInfoTableSelected(event) {
      console.log(
        "HouseInfoTable.vue methods onHouseInfoTableSelected event: ",
        event
      );
      this.showOverlay = true;
      this.houseInfoTableSelectedAptCode = event.item.aptCode;
      console.log(
        "HouseInfoTable.vue methods onHouseInfoTableSelected this.houseInfoTableSelectedAptCode: ",
        this.houseInfoTableSelectedAptCode
      );
      this.getHouseDealList();
      this.houseInfoTableSelectedAptName = event.item.apartmentName;
      this.houseInfoTableSelectedLatLng = {
        lat: event.item.lat,
        lng: event.item.lng,
      };
    },
    async getHouseDealList() {
      await houseDealList(this.houseInfoTableSelectedAptCode).then((res) => {
        console.log("HouseInfoTable.vue methods getHouseDealList res: ", res);
        res.forEach((raw) => {
          this.houseInfoTableSelectedDealList.push({
            dealDate: String(raw.dealYear)
              .concat("년")
              .concat(String(raw.dealMonth))
              .concat("월")
              .concat(String(raw.dealDay))
              .concat("일"),
            dealAmount: raw.dealAmount,
            area: raw.area,
            floor: raw.floor,
          });
        });
      });
    },
    initHouseInfoList() {
      this.houseInfoTableList = [];
      if (this.currHouseInfoList) {
        let index = 0;
        this.currHouseInfoList.forEach((raw) => {
          this.houseInfoTableList.push({
            no: ++index,
            aptCode: raw.aptCode,
            apartmentName: raw.apartmentName,
            buildYear: raw.buildYear,
            recentDeal: null,
            lat: raw.lat,
            lng: raw.lng,
            addressRoad:
              Number(raw.roadNameBubun) === 0
                ? this.getSidoNameSelected
                    .concat(" ")
                    .concat(this.getGugunNameSelected)
                    .concat(" ")
                    .concat(raw.roadName)
                    .concat(" ")
                    .concat(Number(raw.roadNameBonbun))
                : this.getSidoNameSelected
                    .concat(" ")
                    .concat(this.getGugunNameSelected)
                    .concat(" ")
                    .concat(raw.roadName)
                    .concat(" ")
                    .concat(Number(raw.roadNameBonbun))
                    .concat("-")
                    .concat(Number(raw.roadNameBubun)),
            addressJibun:
              Number(raw.bubun) === 0
                ? this.getSidoNameSelected
                    .concat(" ")
                    .concat(this.getGugunNameSelected)
                    .concat(" ")
                    .concat(this.getDongNameSelected)
                    .concat(" ")
                    .concat(Number(raw.bonbun))
                : this.getSidoNameSelected
                    .concat(" ")
                    .concat(this.getGugunNameSelected)
                    .concat(" ")
                    .concat(this.getDongNameSelected)
                    .concat(" ")
                    .concat(Number(raw.bonbun))
                    .concat("-")
                    .concat(Number(raw.bubun)),
          });
        });
      }
    },
  },
};
</script>

<style scoped>
#deal-list {
  height: 50vh;
  overflow-y: auto;
}
</style>