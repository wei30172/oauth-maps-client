<template>
  <div class="map flex">
    <!-- bind Facebook link -->
    <router-link v-if="!fbUserID" to="/profile">
      Go to the profile page to bind Facebook to see more content.
    </router-link>

    <!-- tracker -->
    <section class="tracker">
      <!-- Map -->
      <div id="map"></div>
      <!-- Search -->
      <SearchZone v-if="fbUserID" @handleClick="getIpInfo" />
      <!-- IP Info -->
      <IPInfo v-if="ipInfo" :ipInfo="ipInfo" />
    </section>
  </div>
</template>

<script>
import leaflet from "leaflet";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { getFBInfo } from "@/api/auth";
import SearchZone from "@/components/SearchZone";
import IPInfo from "@/components/IPInfo";

export default {
  components: { SearchZone, IPInfo },
  setup() {
    const store = useStore();
    const fbUserID = ref(null);
    let map;
    let ipInfo = ref(null);

    const getId = async () => {
      const info = await getFBInfo();
      if (info) fbUserID.value = info.id;
    };
    getId();

    // creates the map
    onMounted(() => {
      const maptilerurl =
        "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=3M3Hd2D6IxuQIX5M1hu1";

      const attribution =
        '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e';

      map = leaflet.map("map").setView([23.6978, 120.9605], 5);
      leaflet
        .tileLayer(maptilerurl, {
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution: attribution,
          crossOrigin: true,
        })
        .addTo(map);
    });

    // gets ip information from API
    const getIpInfo = async (queryIp) => {
      try {
        const geourl = `https://geo.ipify.org/api/v1?apiKey=${process.env.VUE_APP_MAPS_APIKEY}&ipAddress=${queryIp}`;

        const { data } = await axios.get(geourl);
        ipInfo.value = {
          address: data.ip,
          state: data.location.region,
          timezone: data.location.timezone,
          isp: data.isp,
          lat: data.location.lat,
          lng: data.location.lng,
        };
        leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(map);
        map.setView([ipInfo.value.lat, ipInfo.value.lng], 13);
      } catch (err) {
        alert(err.message);
      }
    };

    return {
      user: computed(() => store.state.user),
      fbUserID,
      ipInfo,
      getIpInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.map {
  flex-direction: column;
  gap: 0.5rem;
  a {
    color: colors.$text-primary;
    &:hover {
      color: colors.$facebook-primary;
    }
  }
  .tracker {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 85vh;
    #map {
      margin-top: 1rem;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
  }
}
</style>
