import axios from "./config";

export const getAll = async () => {
  try {
    let res = await axios.get("posts");
    return res.data.data.docs;
  } catch (err) {
    return "fail";
  }
};

export const search = async (data) => {
  try {
    let res = await axios.get("posts", {
      params: {
        title: data.title,
        summary: data.summary,
        author: data.author,
        category: data.category,
        tags: data.tags,
      },
    });
    return res.data.data.docs;
  } catch (err) {
    return "fail";
  }
};

export const showPost = async (id) => {
  try {
    let res = await axios.get(`posts/${id}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const addNewPost = async (info) => {
  try {
    let res = await axios.post("posts", info);
    return res.data.status;
  } catch (err) {
    return "fail";
  }
};

export const updateInfo = async (id, newInfo) => {
  try {
    newInfo.category = newInfo.category.id;
    let res = await axios.patch(`posts/${id}`, newInfo);
    return res.data.status;
  } catch (err) {
    return "fail";
  }
};

export const removePost = async (id) => {
  try {
    let res = await axios.delete(`posts/${id}`);
    return res.data.status;
  } catch (err) {
    return "fail";
  }
};
