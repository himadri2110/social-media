import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login, SignUp } from "features/auth";
import {
  Home,
  Explore,
  Bookmarks,
  UserProfile,
  PageNotFound,
  Authentication,
} from "pages";
import { PrivateRoute } from "routes/PrivateRoute";
import { ResetScroll } from "components";
import { SinglePost } from "features/post";

export const AppRoutes = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen">
      <ResetScroll>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/post/:postId" element={<SinglePost />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/profile/:username" element={<UserProfile />} />
          </Route>

          <Route path="/auth" element={<Authentication />}>
            {!token ? (
              <>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
              </>
            ) : (
              <>
                <Route path="login" element={<Navigate to="/" replace />} />
                <Route path="signup" element={<Navigate to="/" replace />} />
              </>
            )}
          </Route>

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </ResetScroll>
    </div>
  );
};
