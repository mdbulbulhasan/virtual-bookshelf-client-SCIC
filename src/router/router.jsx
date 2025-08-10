import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import BookShelf from "../pages/BookShelf/BookShelf";
import MyBooks from "../pages/MyBooks/MyBooks";
import AddBooks from "../pages/AddBooks/AddBooks";
import MyProfile from "../pages/MyProfile/MyProfile";
import BookDetails from "../pages/BookDetails/BookDetails";
import UpdateBook from "../pages/UpdateBook/UpdateBook";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "../context/PrivateRoute";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/bookshelf",
        element: <BookShelf></BookShelf>,
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/books/:id",
        loader: ({ params }) =>
          fetch(`https://virtual-bookshelf-server-weld.vercel.app/books/${params.id}`),
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/addbooks",
        element: (
          <PrivateRoute>
            <AddBooks></AddBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/mybooks",
        element: (
          <PrivateRoute>
            <MyBooks></MyBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/updatebook/:id",
        loader: ({ params }) =>
          fetch(`https://virtual-bookshelf-server-weld.vercel.app/books/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
