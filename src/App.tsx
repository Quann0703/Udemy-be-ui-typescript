import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";

import { DefaultLayout } from "~/layouts";
import { publicRoutes } from "~/routes";
import useAuthModal from "./hooks/useAuthModal";
import Login from "./pages/Login";
import Register from "./components/Register";
import AuthModal from "./components/AuthModal";
import AdminRouter from "./components/AdminRouter/AdminRouter";
import useAccount from "./hooks/useAccount";
import { doGetAccount } from "./store/actions/accountAction";

function App() {
  const modal = useAuthModal();
  const account = useAccount();
  useEffect(() => {
    if (!account?.state?.userInfo?.accessToken) {
      doGetAccount({ ...account });
    }
  }, []);
  console.log(account);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AdminRouter>
                      <Layout>
                        <Page />
                      </Layout>
                    </AdminRouter>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
      {modal.state.isOpen && (
        <AuthModal>
          <>
            {modal.state.isLogin && <Login />}
            {modal.state.isRegister && <Register />}
          </>
        </AuthModal>
      )}
    </>
  );
}

export default App;
