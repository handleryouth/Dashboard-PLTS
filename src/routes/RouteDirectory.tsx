import { Routes, Route } from "react-router-dom";
import { ROUTES_LIST } from "const";

export default function RouteStack() {
  return (
    <Routes>
      {ROUTES_LIST.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
}
