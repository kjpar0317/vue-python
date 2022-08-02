import axiosUtils from "@/utils/axios-util";

async function loginApi(payload) {
  const res = await axiosUtils.post(`/api/user/login`, payload);

  if (res && res.data) {
    return res.data;
  } else {
    console.log(res);
  }
}

export { loginApi };
