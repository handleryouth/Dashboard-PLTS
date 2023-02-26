import { Routes, Route } from "react-router-dom";
import { ROUTES_LIST } from "const";
import { Login, SignUp } from "pages";
import { useCookies } from "react-cookie";

export default function RouteStack() {
  const [cookies] = useCookies(["accessToken"]);

  return (
    <Routes>
      {cookies.accessToken ? (
        <>
          {ROUTES_LIST.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </>
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
