import { message } from "antd";

export const success = (obj, action) => {
  let mess = `${obj} was ${action} successfully!`;
  return message.success(mess, 3);
};

export const fail = (obj, action) => {
  let mess = `${obj} was ${action} fail!`;
  return message.error(mess, 3);
};
