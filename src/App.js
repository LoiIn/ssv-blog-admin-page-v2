import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/home/dashboard/Dashboard";
import Profile from "./components/home/auths/Profiles";
import User from "./components/home/user/User";
import Post from "./components/home/posts/Post";
import DetailPost from "./components/home/posts/Detail";
import FormPost from "./components/home/posts/Form";
import DetailUser from "./components/home/user/Detail";
import Category from "./components/home/categories/Category";
import DetailCategory from "./components/home/categories/Detail";
// import Tag from "./components/home/tags/Tag";
// import DetailTag from "./components/home/tags/Detail";
import Contact from "./components/home/contacts/Contact";
import DetailContact from "./components/home/contacts/Detail";
import { useCookies } from "react-cookie";

// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route exact path="" element={<Dashboard />} />
          <Route exact path="me/profiles" element={<Profile />} />
          <Route exact path="users" element={<User />} />
          <Route exact path="users/:id" element={<DetailUser />} />
          <Route exact path="posts" element={<Post />} />
          <Route exact path="posts/:id" element={<DetailPost />} />
          <Route exact path="posts/new/create" element={<FormPost />} />
          <Route exact path="posts/:id/edit" element={<FormPost />} />
          <Route exact path="contacts" element={<Contact />} />
          <Route exact path="contacts/:id" element={<DetailContact />} />
          <Route exact path="categories" element={<Category />} />
          <Route exact path="categories/:id" element={<DetailCategory />} />
          {/* <Route exact path="/tags" element={<Tag />} />
          <Route exact path="/tags/:id" element={<DetailTag />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
