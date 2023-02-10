import axios from "./config";

export const getAllAdmins = async () => {
  try {
    let res = await axios.get("users");
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const search = async (data) => {
  try {
    const res = await axios.get("admins", {
      params: {
        name: data.name,
        email: data.email,
      },
    });
    return res.data.data;
  } catch (err) {
    return "fail";
  }
};

export const showAdmin = async (id) => {
  try {
    let res = await axios.get(`admins/${id}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const addNewAdmin = async (info) => {
  try {
    let res = await axios.post("admins", info);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const updateInfo = async (id, newInfo) => {
  try {
    let res = await axios.put(`admins/${id}`, newInfo);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const removeAdmin = async (id) => {
  try {
    let res = await axios.delete(`admins/${id}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};
