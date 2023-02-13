import { useState, useEffect, useContext } from "react";
import { getProfile, updateProfile } from "../apis/auth";

function useHookAuth() {
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = async () => {
    let _res = await getProfile();
    if (_res !== "fail") setProfiles(_res);
  };

  const updateProfiles = async (id, info) => {
    let _res = await updateProfile(id, info);
    if (_res !== "fail") setProfiles(_res);
  };

  return [profiles, updateProfiles];
}

export default useHookAuth;
