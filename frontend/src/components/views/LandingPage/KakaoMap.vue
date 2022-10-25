<template>
  <div>
    <p>KakaoMap.vue</p>
    <div id="map_wrap">
      <div id="map">
        <w-flex>
          <div id="menu_wrap_left">
            <house-info-list
              @on-click-house-info-item="onClickHouseInfoItem"
            ></house-info-list>
            <!-- pagination -->
          </div>
          <div id="menu_wrap_right">
            <house-info-detail
              v-if="houseInfoDetailSelected"
            ></house-info-detail>
          </div>
        </w-flex>
      </div>
    </div>
  </div>
</template>

<script>
import HouseInfoList from "@/components/views/LandingPage/HouseInfoList";
import HouseInfoDetail from "@/components/views/LandingPage/HouseInfoDetail";
import { KAKAO_APP_KEY_JAVASCRIPT } from "@/config";
import { mapGetters, mapState } from "vuex";
import { houseinfoStore } from "@/store/store.js";
export default {
  name: "KakaoMap",
  components: {
    HouseInfoList,
    HouseInfoDetail,
  },
  props: {},
  data() {
    return {
      map: null,
      markers: [],
      center: null,
      houseInfoDetailSelected: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_APP_KEY_JAVASCRIPT}`;
      // script.addEventListener("load", () => {
      //   kakao.maps.load(this.initMap);
      // });
      document.head.appendChild(script);
    }
  },
  computed: {
    ...mapState(houseinfoStore, ["houseInfoList"]),
    ...mapGetters(houseinfoStore, ["getHouseInfoList"]),
  },
  methods: {
    onClickHouseInfoItem(currIdxSelected) {
      console.log(
        "KakaoMap.vue methods onClickHouseInfoItem currIdxSelected: ",
        currIdxSelected
      );
      this.houseInfoDetailSelected = currIdxSelected;
    },
    setCenter() {
      if (this.getHouseInfoList.length !== 0) {
        let lat = this.getHouseInfoList[0].lat;
        let lng = this.getHouseInfoList[0].lng;
        this.center = new kakao.maps.LatLng(lat, lng);
      } else {
        this.center = new kakao.maps.LatLng(37.566826, 126.9786567);
      }
    },
    addMarker(position) {
      let marker = new kakao.maps.Marker({
        position,
      });
      marker.setMap(this.map);
      this.markers.push(marker);
    },
    initMap() {
      this.setCenter();
      let mapContainer = document.getElementById("map");
      let mapOption = {
        center: this.center,
        // center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
      this.getHouseInfoList.forEach((e) => {
        let position = new kakao.maps.LatLng(e.lat, e.lng);
        this.addMarker(position);
      });
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  /* height: 400px; */
  height: 60vh;
  padding: 10px;
}
#menu_wrap_left {
  position: inherit;
  /* top: 0;
  left: 0;
  bottom: 0; */
  /* width: 250px; */
  width: 25vh;
  /* width: 25%; */
  /* height: 100%; */
  height: 58vh;
  /* margin: 10px; */
  /* margin: 10px 0 10px 10px; */
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 5;
  font-size: 12px;
  border-radius: 10px;
}
#menu_wrap_right {
  position: inherit;
  /* top: 0;
  right: 0;
  bottom: 0; */
  /* width: 250px; */
  width: 25vh;
  /* width: 25%; */
  height: 100%;
  margin: 0px 0px 0px 10px;
  /* padding: 5px; */
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 5;
  font-size: 12px;
  border-radius: 10px;
}
/* .map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 500px;
} */
</style>