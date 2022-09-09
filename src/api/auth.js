import { axiosPrivate } from "./axios";

// get user
export const getLoginUser = async () => {
  const { data } = await axiosPrivate.get(`api/auth/user`);
  return data.user;
};

// get fb info
export const getFBInfo = async () => {
  const { data } = await axiosPrivate.get(`api/auth/userfb`);
  return data.fbinfo;
};

// user logout
export const userLogout = async () => {
  await axiosPrivate.get(`api/auth/logout`);
  return;
};

// user unbind
export const userUnbind = async () => {
  await axiosPrivate.get(`api/auth/unbind`);
  return;
};
