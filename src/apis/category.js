import axios from "./config";

export const getAllCategories = async () => {
  try {
    let res = await axios.get("/categories");
    return res.data.data.docs;
  } catch (err) {
    return "fail";
  }
};

export const search = async (data) => {
  try {
    let res = await axios.get("/categories", {
      params: {
        name: data.name,
        slug: data.slug,
      },
    });
    return res.data.data.docs;
  } catch (err) {
    return "fail";
  }
};

export const showCategory = async (id) => {
  try {
    let res = await axios.get(`/categories/${id}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const addNewCategory = async (info) => {
  try {
    let res = await axios.post("/categories", info);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const updateInfo = async (id, newInfo) => {
  try {
    let res = await axios.patch(`/categories/${id}`, newInfo);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const removeCategory = async (id) => {
  try {
    let res = await axios.delete(`/categories/${id}`);
    return res.data.status;
  } catch (err) {
    return "fail";
  }
};
