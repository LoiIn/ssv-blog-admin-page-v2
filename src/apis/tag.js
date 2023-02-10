import axios from "./config";

export const getAllTags = async () => {
  try {
    let res = await axios.get("tags");
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const search = async (data) => {
  try {
    let res = await axios.get("tags", {
      params: {
        title: data.title,
        slug: data.slug,
      },
    });
    return res.data.data;
  } catch (err) {
    return "fail";
  }
};

export const showTag = async (id) => {
  try {
    let res = await axios.get(`tags/${id}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const addNewTag = async (info) => {
  try {
    let res = await axios.post("tags", info);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const updateInfo = async (id, newInfo) => {
  try {
    let res = await axios.put(`tags/${id}`, newInfo);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const removeTag = async (id) => {
  try {
    let res = await axios.delete(`tags/${id}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};
