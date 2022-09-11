import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import Interface from "./components/Interface/Interface"
import { privateRoutes, nonPrivateRoutes } from "./utils/routes"
import { useEffect } from "react";
import useRequest from "./hooks/UseRequest"
import { setLogin } from "./store/action"

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { request, response } = useRequest()
  const { login } = useSelector(state => state.generalReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem('auth'))
    if (auth) {
      // console.log(auth)
      request("POST", "/admin/autoLogin", { authToken: auth.token })
    }
  }, [])

  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        dispatch(setLogin(response.data))
      }
    }
  }, [response])

  return (
    <>
      {
        login ? (
          <>
            <Interface>
              <Routes>
                {
                  privateRoutes.map((val, index) => <Route key={index} path={val.path} element={<val.component />} />)
                }
              </Routes>
            </Interface>
          </>
        ) : (
            <>
              <Routes>
                {
                  nonPrivateRoutes.map((val, index) => <Route key={index} path={val.path} element={<val.component />} />)
                }
              </Routes>
            </>
          )
      }     
      <ToastContainer/> 
    </>
  );
}

export default App;
