import axios from "axios";

const BASE_URL =
  "https://asia-east2-botfat.cloudfunctions.net/project_controller";

const cityRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUrbanRenewalData = async () => {
  try {
    const data = {
      lat: 24.993955,
      lng: 121.504603,
      function: "xinbei_distance",
    };
    const res = await cityRequest.post("/", data);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const getUrbanRenewalPolygenData = async () => {
  try {
    const data = {
      directory: "tucheng.json",
      function: "xinbei_json",
    };
    const res = await cityRequest.post("/", data);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};
