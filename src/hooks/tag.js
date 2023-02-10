import { useState, useEffect } from "react";
import { getAllTags, addNewTag, updateInfo, removeTag, showTag, search} from "../apis/tag";

function useHookTag() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getTags();
    }, []);

    const getTags = async () => {
        let _tags = await getAllTags();
        if(_tags !== "fail") setTags(_tags);
    }

    const searchTags = async (data) => {
        let _tags = await search(data);
        if(_tags !== "fail") setTags(_tags);
    }

    const viewTag = async (id) => {
        let _tag = await showTag(id);
        if(_tag !== "fail") return _tag;
    }

    const addTag = async (info) => {
        let _tag = await addNewTag(info);
        if(_tag !== "fail")  setTags([...tags, _tag]);
    }

    const getIndex = (id) => {
        for( var i = 0; i < tags.length; i++){
            if(tags[i].id === id) return i;
        }
        return -1;
    }

    const updateTag = async (id, newInfo) => {
        const _tag = await updateInfo(id, newInfo);
       if(_tag !== "fail"){
           let key = getIndex(id);
           let _tags = [...tags];
           _tags[key] = _tag;
           setTags(_tags);
       }
    }

    const deleteTag = async (id) => {
        let res = await removeTag(id);
        if(res === "success"){
            let _tags = tags.filter((x) => x.id !== id);
            setTags(_tags);
        }
    }

    return [tags, addTag, updateTag, deleteTag, viewTag, searchTags, getIndex];
}

export default useHookTag;