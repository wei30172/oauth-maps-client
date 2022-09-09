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
      <SearchZone v-if="fbUserID" @handleClick="handleSearch" />
      <!-- IP Info -->
      <IPInfo v-if="ipInfo" :ipInfo="ipInfo" />
    </section>
  </div>
</template>

<script>
import L from "leaflet";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { getFBInfo } from "@/api/auth";
import { getUrbanRenewalData, getUrbanRenewalPolygenData } from "@/api/city";
import SearchZone from "@/components/SearchZone";
import IPInfo from "@/components/IPInfo";

export default {
  components: { SearchZone, IPInfo },
  setup() {
    const store = useStore();
    let fbUserID = ref(null);
    let ipInfo = ref(null);
    let map;
    let center = [25.012, 121.4645]; // New Taipei City Hall
    let zoom = 17; // 0 - 18

    onMounted(async () => {
      try {
        // create the map
        map = L.map("map").setView(center, zoom);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
          zoomControl: true, // show - + button
        }).addTo(map);

        // get current position
        let position = await getPosition();
        if (position) center = position;
        createUsermarker();
        // add markers to map
        const resultData = await getUrbanRenewalData();
        addMarkertoMap(resultData);

        // add polygen data to Map
        const resultPolygenData = await getUrbanRenewalPolygenData();
        polygenDatatoMap(resultPolygenData);
      } catch (error) {
        console.log(error);
      }
    });

    // get facebook id
    const getFacebookId = async () => {
      const info = await getFBInfo();
      if (info) fbUserID.value = info.id;
    };
    getFacebookId();

    // get geolocation
    const getCurrentPosition = () => {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
    };

    // get current position
    const getPosition = async () => {
      try {
        let { coords } = await getCurrentPosition();
        return [coords.latitude, coords.longitude];
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    // create marker
    const createUsermarker = async () => {
      const marker = L.marker(center, {
        title: center,
      }).addTo(map);

      // create marker img div
      const imgDiv = document.createElement("div");

      // get fb picture
      const fbPicture = new Image(100, 100);
      fbPicture.src = `https://graph.facebook.com/${fbUserID.value}/picture?type=large`;
      imgDiv.appendChild(fbPicture);

      // get google picture
      const googlePicture = new Image(100, 100);
      googlePicture.src = store.state.user?.picture;
      imgDiv.appendChild(googlePicture);

      marker
        .bindTooltip(imgDiv, {
          permanent: true,
        })
        .openTooltip();
      map.setView(center, zoom);
    };

    // add polygen data to Map
    const polygenDatatoMap = (data) => {
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`<b>Name: </b>${feature.properties.name}`);
        },
      }).addTo(map);
    };

    // add markers to map
    const addMarkertoMap = (data) => {
      for (let m of data) {
        L.marker([m.latitude, m.longitude]).addTo(map);
      }
    };

    // get position information
    const findNearbyPlaces = async (queryIp) => {
      console.log(queryIp);
      // getQueryPosition(queryIp);
    };

    // get position information ,create marker, and add polygen data to Map
    const handleSearch = async (queryIp) => {
      try {
        // get position information
        await findNearbyPlaces(queryIp);
      } catch (err) {
        alert(err.message);
      }
    };

    return {
      user: computed(() => store.state.user),
      fbUserID,
      ipInfo,
      handleSearch,
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
