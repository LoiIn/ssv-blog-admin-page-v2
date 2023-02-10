import { useState, useEffect } from "react";
import { getAllContacts,  removeContact, showContact, search} from "../apis/contact";

function useHookContact() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async () => {
        let _contacts = await getAllContacts();
        if(_contacts !== "fail") setContacts(_contacts);
    }

    const searchContacts= async (data) => {
        let _contacts = await search(data);
        if(_contacts !== "fail") setContacts(_contacts);
    }

    const viewContact = async (id) => {
        let _contact = await showContact(id);
        if(_contact !== "fail") return _contact;
    }

    const deleteContact = async (id) => {
        let res = await removeContact(id);
        if(res === "success"){
            let _contacts = contacts.filter((x) => x.id !== id);
            setContacts(_contacts);
        }
    }

    return [contacts, viewContact, deleteContact, searchContacts];
}

export default useHookContact;