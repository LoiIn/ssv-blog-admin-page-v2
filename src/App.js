import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/auths/Profiles";
import User from "./components/user/User";
import Post from "./components/posts/Post";
import DetailPost from "./components/posts/Detail";
import FormPost from "./components/posts/Form";
import DetailUser from "./components/user/Detail";
import Category from "./components/categories/Category";
import DetailCategory from "./components/categories/Detail";
import { useCookies } from "react-cookie";

function App() {
  const [cookie, setCookie] = useCookies([]);

  const RequireNoAuth = (props) => {
    if (Object.keys(cookie).length === 0) {
      return props.component;
    }
    document.location = "/";
  };

  const RequireAuth = (props) => {
    if (cookie) {
      return props.component;
    }
    document.location = "/login";
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<RequireNoAuth component={<Login />} />}
        />
        <Route path="/" element={<RequireAuth component={<Home />} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="me/profiles" element={<Profile />} />
          <Route path="users" element={<User />} />
          <Route path="users/:id" element={<DetailUser />} />
          <Route path="posts" element={<Post />} />
          <Route path="posts/:id" element={<DetailPost />} />
          <Route path="posts/new/create" element={<FormPost />} />
          <Route path="posts/:id/edit" element={<FormPost />} />
          <Route path="categories" element={<Category />} />
          <Route path="categories/:id" element={<DetailCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
