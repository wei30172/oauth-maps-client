<template>
  <div class="map flex">
    <!-- bind Facebook link -->
    <router-link v-if="!fbUserID" to="/profile">
      <h1>綁定Facebook以查看更多內容</h1>
    </router-link>

    <!-- tracker -->
    <section class="tracker">
      <!-- Map -->
      <div id="map"></div>
      <!-- Search Zone-->
      <div class="search" ref="searchRef">
        <SearchInput v-if="fbUserID" @handleClick="searchByKeyword" />
      </div>
    </section>

    <!-- Search Result-->
    <SearchResult
      :urbanRenewalData="urbanRenewalData"
      @handleClick="createUsermarker"
    />
  </div>
</template>

<script>
import L from "leaflet";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { getFBInfo } from "@/api/auth";
import { getUrbanRenewalData, getUrbanRenewalPolygenData } from "@/api/city";
import SearchInput from "@/components/SearchInput";
import SearchResult from "@/components/SearchResult";
import getFaceBookPicture from "@/utils/getFaceBookPicture";

export default {
  components: { SearchInput, SearchResult },
  setup() {
    const store = useStore();
    const searchRef = ref(null);
    let fbUserID = ref(null);
    let urbanRenewalData = ref([]);
    let map;
    let center = [24.972663, 121.443671]; // Tucheng
    let zoom = 17; // 0 - 18
    let curMarker = null;

    onMounted(async () => {
      try {
        // create the map
        map = L.map("map").setView(center, zoom);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
          zoomControl: true, // show - + button
        }).addTo(map);

        if (fbUserID.value) createUsermarker();

        // add markers to map
        const data = await getUrbanRenewalData();
        urbanRenewalData.value = data;
        addMarkerstoMap(urbanRenewalData.value);

        // add polygen data to Map
        const polygenData = await getUrbanRenewalPolygenData();
        polygenDatatoMap(polygenData);
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

    // add polygen data to Map
    const polygenDatatoMap = (data) => {
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`<b>Name: </b>${feature.properties.name}`);
        },
      }).addTo(map);
    };

    // add markers to map
    const addMarkerstoMap = (data) => {
      for (let m of data) {
        const marker = L.marker([m.latitude, m.longitude], {
          title: m.stop_name,
        }).addTo(map);
        marker.bindPopup(`<b>${m.latitude}, ${m.longitude}</b>`);
      }
    };

    // search by keyword
    const searchByKeyword = (keyword) => {
      goToElement(searchRef.value);
      try {
        console.log(keyword);
      } catch (err) {
        alert(err.message);
      }
    };

    // add marker on position
    const createUsermarker = async (posision) => {
      if (posision) {
        center = posision;
        goToElement();
      }

      // remove old marker
      if (curMarker !== null) {
        map.removeLayer(curMarker);
      }

      // create current marker
      const marker = L.marker(center, {
        title: center,
      }).addTo(map);

      curMarker = marker;

      // create marker img div
      const imgDiv = document.createElement("div");

      // get fb picture
      const fbPicture = new Image(100, 100);
      fbPicture.src = getFaceBookPicture(fbUserID.value);
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

    // go to element by ref
    const goToElement = (ref) => {
      let top = 0;
      if (ref) {
        const element = ref;
        top = element.offsetTop;
      }
      window.scrollTo(0, top);
    };

    return {
      user: computed(() => store.state.user),
      searchRef,
      fbUserID,
      urbanRenewalData,
      searchByKeyword,
      createUsermarker,
      goToElement,
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
    text-align: center;
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
    height: 80vh;
    #map {
      margin-top: 1rem;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    .search {
      display: flex;
      justify-content: space-between;
      width: 100%;
      background-color: colors.$background-dark;
    }
  }
}
</style>
