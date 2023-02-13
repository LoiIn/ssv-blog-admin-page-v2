import { useState, useEffect } from "react";
import {
  getAll,
  addNewPost,
  updateInfo,
  removePost,
  showPost,
  search,
} from "../apis/post";
import { success, fail } from "./../components/Message";

function useHookPost() {
  const [posts, setPosts] = useState([]);
  const model = "post";

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    let _posts = await getAll();
    if (_posts !== "fail") {
      _posts = _posts.map((item) => {
        item.author = item.author.name;
        item.category = item.category.name;
        return item;
      });
      setPosts(_posts);
    }
  };

  const searchPosts = async (data) => {
    let _posts = await search(data);
    if (_posts !== "fail") {
      _posts = _posts.map((item) => {
        item.author = item.author.name;
        item.category = item.category.name;
        return item;
      });
      setPosts(_posts);
    }
  };

  const viewPost = async (id) => {
    let _post = await showPost(id);
    if (_post !== "fail") return _post;
  };

  const addPost = async (info) => {
    let { status, data } = await addNewPost(info);
    if (status === "success") {
      setPosts([...posts, data]);
      success(model, "added");
    } else fail(model, "added");
  };

  const getIndex = (id) => {
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id === id) return i;
    }
    return -1;
  };

  const updatePost = async (id, newInfo) => {
    const { status, data } = await updateInfo(id, newInfo);
    if (status === "true") {
      let key = getIndex(id);
      let _posts = [...posts];
      _posts[key] = data;
      setPosts(_posts);
      success(model, "updated");
    } else fail(model, "updated");
  };

  const deletePost = async (id) => {
    let res = await removePost(id);
    if (res === "success") {
      let _posts = posts.filter((x) => x.id !== id);
      setPosts(_posts);
      success(model, "deleted");
    } else fail(model, "deleted");
  };

  return [
    posts,
    addPost,
    updatePost,
    deletePost,
    viewPost,
    searchPosts,
    getIndex,
  ];
}

export default useHookPost;
