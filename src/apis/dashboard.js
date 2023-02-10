import axios from "./config";

export const rankPost = async (type) => {
  try {
    let res = await axios.get(`posts/rank/${type}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const countPostsByAgent = async (agent) => {
  try {
    let res = await axios.get(`posts/count/${agent}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const getReactsInYear = async (react, year) => {
  return [16, 18, 23, 27, 32, 36, 39, 38, 35, 29, 22, 17];
  //   try {
  //     let res = await axios.get(`${react}/${year}`);
  //     return res.data;
  //   } catch (err) {
  //     return "fail";
  //   }
};

export const getCmtsInYear = async (react, year) => {
  return [25, 18, 23, 44, 32, 36, 39, 18, 35, 49, 22, 55];
  //   try {
  //     let res = await axios.get(`${react}/${year}`);
  //     return res.data;
  //   } catch (err) {
  //     return "fail";
  //   }
};
