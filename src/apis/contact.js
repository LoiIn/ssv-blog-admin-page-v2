import axios from "./config";

export const getAllContacts = async () => {
  try {
    const res = await axios.get("/contacts");
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const search = async (data) => {
  try {
    const res = await axios.get("/contacts", {
      params: {
        name: data.name,
        email: data.email,
        content: data.content,
      },
    });
    return res.data.data;
  } catch (err) {
    return "fail";
  }
};

export const showContact = async (id) => {
  try {
    let res = await axios.get(`/contacts/${id}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};

export const removeContact = async (id) => {
  try {
    let res = await axios.delete(`/contacts/${id}`);
    return res.data;
  } catch (err) {
    return "fail";
  }
};
