import axios from "./config";

export const getAll = async () => {
  try {
    let res = await axios.get("/users");
    return res.data.data.docs;
  } catch (err) {
    return "fail";
  }
};

export const search = async (data) => {
  try {
    const res = await axios.get("/users", {
      params: {
        name: data.name,
        email: data.email,
        role: data.role === "all" ? undefined : data.role,
      },
    });
    return res.data.data.docs;
  } catch (err) {
    return "fail";
  }
};

export const showUser = async (id) => {
  try {
    let res = await axios.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const addNewUser = async (info) => {
  try {
    let res = await axios.post("/users", info);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const updateInfo = async (id, newInfo) => {
  try {
    let res = await axios.put(`/users/${id}`, newInfo);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const removeUser = async (id) => {
  try {
    let res = await axios.delete(`/users/${id}`);
    return res.data.status;
  } catch (err) {
    return "fail";
  }
};

export const changeRole = async (id, role) => {
  try {
    let res = await axios.patch(`/users/change-role/${id}`, {
      role: role == "admin" ? "user" : "admin",
    });
    return res.data;
  } catch (err) {
    return "fail";
  }
};
