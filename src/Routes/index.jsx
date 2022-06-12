import { useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";

import { RouteList } from "./routes";
import Page404 from "../views/404";

export default () => {
  const account = useSelector((state) => state.account);
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        {RouteList.map((item, i) => {
          if (item.Role == account.user.roleId)
            return (
              <Route key={i} path={item.Path} element={<item.Component />}>
                {item.Children &&
                  item.Children.map((child, ii) => (
                    <Route
                      key={ii}
                      path={child.Path}
                      element={<child.Component {...child} />}
                    />
                  ))}
              </Route>
            );
        })}
      </Routes>
    </HashRouter>
  );
};
