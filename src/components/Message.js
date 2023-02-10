import { message } from "antd";

export const success = (obj, action) => {
  let mess = `${obj} was ${action}ed successfully!`;
  return message.success(mess, 5);
};

export const fail = (obj, action) => {
  let mess = `${obj} was ${action}ed fail!`;
  return message.error(mess, 5);
};
