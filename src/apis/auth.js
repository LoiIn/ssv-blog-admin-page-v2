import axios from "./config";

export const login = async (values) => {
  try {
    let res = await axios.post("/users/login", JSON.stringify(values));
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const logout = async () => {
  try {
    let res = await axios.get("/users/logout");
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const getProfile = async () => {
  try {
    let res = await axios.get("/me/profiles");
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const updateProfile = async (id, newInfo) => {
  try {
    let res = await axios.put(`/admins/${id}`, newInfo);
    return res.data;
  } catch (err) {
    return "fail";
  }
};
