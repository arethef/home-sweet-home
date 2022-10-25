<template>
  <div>
    <!-- <p>KakaoMapHouseDetail.vue</p> -->
    <div id="map"></div>
  </div>
</template>

<script>
import { KAKAO_APP_KEY_JAVASCRIPT } from "@/config";
export default {
  name: "KakaoMap",
  components: {},
  props: {
    houseLatLng: {
      type: Object,
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      center: null,
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
      document.head.appendChild(script);
    }
  },
  watch: {
    houseLatLng() {
      return this.houseLatLng;
    },
  },
  computed: {},
  methods: {
    setCenter() {
      this.center = new kakao.maps.LatLng(
        this.houseLatLng.lat,
        this.houseLatLng.lng
      );
    },
    addMarker(position) {
      let marker = new kakao.maps.Marker({
        position,
      });
      marker.setMap(this.map);
    },
    initMap() {
      this.setCenter();
      let mapContainer = document.getElementById("map");
      let mapOption = {
        center: this.center,
        level: 3,
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
      this.addMarker(this.center);
    },
  },
};
</script>

<style scoped>
#map {
  width: 50vh;
  height: 20vh;
}
</style>