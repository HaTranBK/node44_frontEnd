import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    token: localStorage.getItem("LOGIN_USER"),
  },
};

//tạo 1 instance của axios

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

//thêm 1 interceptor để gắn token vào headers trước mỗi request
axiosInstance.interceptors.request.use(
  (conf) => {
    //kiểm tra requiredAuth của API
    if (conf.requiredAuth) {
      const accessToken = localStorage.getItem("LOGIN_USER");
      console.log("accessToken: ", accessToken);
      if (accessToken) conf.headers["token"] = `${accessToken}`;
    }
    return conf;
  },
  (err) => {}
);

const extendToken = async () => {
  const { data } = await axiosInstance.post(
    `/auth/extend-token`,
    {},
    {
      withCredentials: true,
    }
  );
  localStorage.setItem("LOGIN_USER", data.data);
  return data;
};
//config interceptor cho response mỗi khi API nào đó trả về 401
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  }, //param function khi response API tra ve 2xx
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401) {
      try {
        const data = await extendToken();
        console.log("data in interceptor response: ", data);

        originalRequest.headers["token"] = data.data;

        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("error in extendToken: ", err);
      }
    }
    return err;
  } //param function khi response API tra ve !== 2xx
);
export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const getListVideo = async () => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/videos/get-videos`,
    { requiredAuth: true },
    options
  );
  return data;
};

export const getType = async () => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/videos/get-type`,
    {
      requiredAuth: true,
    },
    options
  );
  return data;
};

export const getListVideoByType = async (typeid) => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/videos/get-video-type-by-id/${typeid}`,
    options
  );
  return data;
};

export const RegisterAPI = async (payload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, payload);
  return data;
};

export const loginAPI = async (payload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, payload, {
    withCredentials: true, //cho pphép gửi và nhận cookie từ server
  });
  return data;
};

export const loginAsyncKeyAPI = async (payload) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/login-async-key`,
    payload,
    {
      withCredentials: true, //cho pphép gửi và nhận cookie từ server
    }
  );
  return data;
};
export const loginFacebook = async (newUser) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login-facebook`, newUser);
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await axios.post(`${BASE_URL}/auth/forgot-password`, email);
  return data;
};

export const changePassAPI = async (payload) => {
  // payload:email, newPass, code;
  const { data } = await axiosInstance.post(
    `${BASE_URL}/auth/change-password`,
    payload
  );
  return data;
};
