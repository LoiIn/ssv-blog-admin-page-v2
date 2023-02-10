import { useState, useEffect } from "react";
import {
  getAll,
  addNewUser,
  removeUser,
  showUser,
  search,
  changeRole,
} from "../apis/user";

function useHookUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let _users = await getAll();
    if (_users !== "fail") setUsers(_users);
  };

  const searchUsers = async (data) => {
    let _users = await search(data);
    if (_users !== "fail") setUsers(_users);
  };

  const viewUser = async (id) => {
    let { status, data } = await showUser(id);
    if (status === "success") return data;
  };

  const addUser = async (info) => {
    let { status, data } = await addNewUser(info);
    if (status !== "fail") setUsers([...users, data]);
  };

  const deleteUser = async (id) => {
    let res = await removeUser(id);
    if (res === "success") {
      let _users = users.filter((x) => x.id !== id);
      setUsers(_users);
    }
  };

  const getIndex = (id) => {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === id) return i;
    }
    return -1;
  };

  const switchRole = async (id, role) => {
    let { status, data } = await changeRole(id, role);
    if (status === "success") {
      let key = getIndex(id);
      let _users = [...users];
      _users[key] = data;
      setUsers(_users);
    }
  };

  return [users, addUser, deleteUser, viewUser, searchUsers, switchRole];
}

export default useHookUser;
