import { useState, useEffect } from "react";
import {
  getAllCategories,
  addNewCategory,
  updateInfo,
  removeCategory,
  showCategory,
  search,
} from "../apis/category";
import { success, fail } from "../components/Message";

function useHookCategory() {
  const [categories, setCategories] = useState([]);
  const model = "category";

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    let _categories = await getAllCategories();
    if (_categories !== "fail") setCategories(_categories);
  };

  const searchCategories = async (data) => {
    let _categories = await search(data);
    if (_categories !== "fail") setCategories(_categories);
  };

  const viewCategory = async (id) => {
    let _category = await showCategory(id);
    if (_category !== "fail") return _category;
  };

  const addCategory = async (info) => {
    let { status, data } = await addNewCategory(info);
    if (status === "success") {
      setCategories([...categories, data]);
      success(model, "added");
    } else fail(model, "added");
  };

  const getIndex = (id) => {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id === id) return i;
    }
    return -1;
  };

  const updateCategory = async (id, newInfo) => {
    const { status, data } = await updateInfo(id, newInfo);
    if (status === "success") {
      let key = getIndex(id);
      let _categories = [...categories];
      _categories[key] = data;
      setCategories(_categories);
      success(model, "updated");
    } else {
      fail(model, "updated");
    }
  };

  const deleteCategory = async (id) => {
    let res = await removeCategory(id);
    if (res === "success") {
      let _categories = categories.filter((x) => x.id !== id);
      setCategories(_categories);
      success(model, "deleted");
    } else {
      fail(model, "deleted");
    }
  };

  return [
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    viewCategory,
    searchCategories,
    getIndex,
  ];
}

export default useHookCategory;
