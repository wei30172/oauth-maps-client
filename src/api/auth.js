import { axiosPrivate } from "./axios";

// get user
export const getLoginUser = async () => {
  try {
    const { data } = await axiosPrivate.get(`api/auth/user`);
    return data.user;
  } catch (error) {
    console.log(error);
  }
};

// get fb info
export const getFBInfo = async () => {
  try {
    const { data } = await axiosPrivate.get(`api/auth/userfb`);
    return data.fbinfo;
  } catch (error) {
    console.log(error);
  }
};

// user logout
export const userLogout = async () => {
  try {
    await axiosPrivate.get(`api/auth/logout`);
    return;
  } catch (error) {
    console.log(error);
  }
};

// user unbind
export const userUnbind = async () => {
  try {
    await axiosPrivate.get(`api/auth/unbind`);
    return;
  } catch (error) {
    console.log(error);
  }
};
