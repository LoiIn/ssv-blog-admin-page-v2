import { useState, useEffect } from "react";
import { getAllAdmins, addNewAdmin, removeAdmin, showAdmin, search} from "../apis/admin";

function useHookAdmin() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
       getAdmins();
    }, []);

    const getAdmins = async () => {
        let _admins = await getAllAdmins();
        if(_admins !== "fail") setAdmins(_admins);
    }

    const searchAdmins = async (data) => {
        let _admins = await search(data);
        if(_admins !== "fail") setAdmins(_admins);
    }

    const viewAdmin = async (id) => {
        let _admin = await showAdmin(id);
        if(_admin !== "fail") return _admin;
    }

    const addAdmin = async (info) => {
        let _admin = await addNewAdmin(info);
        if(_admin !== "fail")  setAdmins([...admins, _admin]);
    }

    const deleteAdmin = async (id) => {
        let res = await removeAdmin(id);
        if(res === "success"){
            let _admins = admins.filter((x) => x.id !== id);
            setAdmins(_admins);
        }
    }

    return [admins, addAdmin, deleteAdmin, viewAdmin, searchAdmins];
}

export default useHookAdmin;