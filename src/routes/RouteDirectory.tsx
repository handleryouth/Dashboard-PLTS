import { Routes, Route } from "react-router-dom";
import { ADMIN_ROUTES, USER_ROUTES } from "const";
import { Login, SignUp } from "pages";
import { useCookies } from "react-cookie";

export default function RouteStack() {
  const [cookies] = useCookies(["isLogin", "staffData"]);

  return (
    <Routes>
      {cookies.isLogin ? (
        cookies.staffData.role === "admin" ? (
          <>
            {ADMIN_ROUTES.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </>
        ) : (
          <>
            {USER_ROUTES.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </>
        )
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Login />} />
        </>
      )}
    </Routes>
  );
}
