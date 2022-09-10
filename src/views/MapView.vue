<template>
  <div class="map flex">
    <!-- loading -->
    <LoadingModal v-if="loading" />

    <!-- alert -->
    <ToastAlert v-if="alertMsg">
      <p>{{ alertMsg }}</p>
    </ToastAlert>

    <!-- bind Facebook link -->
    <router-link v-if="!fbUserID" to="/profile">
      <h1>綁定Facebook以查看更多內容</h1>
    </router-link>

    <!-- tracker -->
    <section class="tracker">
      <!-- Map -->
      <div id="map"></div>
      <!-- Search Zone-->
      <div v-if="fbUserID" class="search" ref="searchRef">
        <div class="flex">
          <SearchInput @searchByKeyword="searchByKeyword" />
          <button class="cursor-pointer" @click="searchByKeyword()">
            <p>清除搜尋 {{ searchKeyword }}</p>
          </button>
        </div>
        <div class="pagination-container">
          <Pagination
            :dataList="filteredurbanRenewalData"
            @getPaginatedData="getPaginatedData"
          />
        </div>
      </div>
    </section>

    <!-- Search Result-->
    <SearchResult
      v-if="fbUserID"
      :paginatedData="paginatedData"
      @createUsermarker="createUsermarker"
    />
    <ScrollTopBtn @goToElement="goToElement" />
  </div>
</template>

<script>
import L from "leaflet";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getFBInfo } from "@/api/auth";
import { getUrbanRenewalData, getUrbanRenewalPolygenData } from "@/api/city";
import LoadingModal from "@/components/LoadingModal";
import SearchInput from "@/components/SearchInput";
import SearchResult from "@/components/SearchResult";
import Pagination from "@/components/CustomPagination";
import ToastAlert from "@/components/ToastAlert.vue";
import ScrollTopBtn from "@/components/ScrollTopBtn";
import getFaceBookPicture from "@/utils/getFaceBookPicture";

export default {
  components: {
    LoadingModal,
    SearchInput,
    SearchResult,
    Pagination,
    ToastAlert,
    ScrollTopBtn,
  },
  setup() {
    const store = useStore();
    const searchRef = ref(null);
    let fbUserID = ref(null);
    let loading = ref(false);
    let alertMsg = ref(null);
    let urbanRenewalData = ref([]);
    let filteredurbanRenewalData = ref([]);
    let paginatedData = ref([]);
    let searchKeyword = ref(null);
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

        loading.value = true;

        // add markers to map
        const data = await getUrbanRenewalData();
        urbanRenewalData.value = data;
        filteredurbanRenewalData.value = data;
        addMarkerstoMap(urbanRenewalData.value);

        // add polygen data to Map
        const polygenData = await getUrbanRenewalPolygenData();
        polygenDatatoMap(polygenData);

        loading.value = false;
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
      searchKeyword.value = keyword;
      if (keyword) {
        filteredurbanRenewalData.value = urbanRenewalData.value.filter((data) =>
          data.stop_name.includes(keyword)
        );
        if (!filteredurbanRenewalData.value.length) {
          alertMsg.value = "沒有符合的資料";
        }
      } else {
        filteredurbanRenewalData.value = urbanRenewalData.value;
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

    const getPaginatedData = (data) => {
      paginatedData.value = data;
      goToElement(searchRef.value);
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

    watch(
      () => alertMsg.value,
      () => {
        setTimeout(() => {
          alertMsg.value = null;
        }, 1500);
      }
    );

    return {
      user: computed(() => store.state.user),
      searchRef,
      fbUserID,
      loading,
      alertMsg,
      urbanRenewalData,
      filteredurbanRenewalData,
      paginatedData,
      searchKeyword,
      searchByKeyword,
      createUsermarker,
      goToElement,
      getPaginatedData,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
@use "../styles/mixin/screens" as screens;
.map {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  h1 {
    font-size: 1.5rem;
  }
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
    height: 85vh;
    #map {
      margin-top: 1rem;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    .search {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      background-color: colors.$background-dark;
      button {
        background-color: transparent;
        color: colors.$white;
        &:hover {
          color: colors.$danger-background;
          border-bottom: 1px solid colors.$danger-background;
        }
      }
      .pagination-container {
        min-height: 40px;
      }
    }
  }
}

@include screens.tablet {
  .map {
    h1 {
      font-size: 2rem;
    }
    .search {
      flex-direction: row;
      justify-content: space-between;
      button {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
