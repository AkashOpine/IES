import axios from "axios";
axios.interceptors.request.use(
  (config) => {
    //get Token
    // let token = localStorage.getItem("token");
    // let AuthToken = "";
    // config.headers["Authorization"] = "Bearer " + token;
    config.headers["Content-Type"] = "multipart/form-data";
    // config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

function refreshAccessToken() {
  localStorage.removeItem("token");
  window.location.reload();
}
const apiPost = (endPoint, reqdata) => {
  try {
    return axios
      .post(endPoint, reqdata)
      .then((response) => {
        if (
          (response.status >= 200 && response.status < 300) ||
          response.status === 304
        ) {
          return { error: null, response: response, resultCode: 1 };
        } else {
          return { error: response, resultCode: 2, response: [] };
        }
      })
      .catch((error) => {
        return { error: error.response, resultCode: 2, response: [] };
      });
  } catch (error) {
    console.log(error);
  }
};
const apiPostBase64File = async (endPoint, reqdata) => {
  const response = await axios.post(endPoint, reqdata);

  return response.data; // 🔥 always returns JSON data
};
 const apiPostPdf = async (endPoint, reqdata) => {
  const response = await axios.post(endPoint, reqdata, {
    responseType: "blob", // 🔥 IMPORTANT
  });

  return response; // AxiosResponse<Blob>
};

const apiPut = (endPoint, reqdata) => {
  try {
    return axios
      .put(endPoint, reqdata)
      .then((response) => {
        if (
          (response.status >= 200 && response.status < 300) ||
          response.status === 304
        ) {
          return { error: null, response: response, resultCode: 1 };
        } else {
          return { error: response, resultCode: 2, response: [] };
        }
      })
      .catch((error) => {
        return { error: error.response, resultCode: 2, response: [] };
      });
  } catch (error) {
    console.log(error);
  }
};

const apiGet = (endPoint) => {
  return axios
    .get(endPoint)
    .then((response) => {
      if (
        (response.status >= 200 && response.status < 300) ||
        response.status === 304
      ) {
        return { error: null, response: response, resultCode: 1 };
      } else {
        return { error: response, resultCode: 2, response: [] };
      }
    })
    .catch((error) => {
      console.log("error", error);
      return { error: error.data, resultCode: 2, response: [] };
    });
};
const apiDelete = (endPoint) => {
  try {
    return axios
      .delete(endPoint)
      .then((response) => {
        if (
          (response.status >= 200 && response.status < 300) ||
          response.status === 304
        ) {
          return { error: null, response: response, resultCode: 1 };
        } else {
          return { error: response, resultCode: 2, response: [] };
        }
      })
      .catch((error) => {
        return { error: error.response, resultCode: 2, response: [] };
      });
  } catch (error) {
    console.log(error);
  }
};

export { apiPost, apiGet, apiPut, apiDelete ,apiPostBase64File, apiPostPdf};
