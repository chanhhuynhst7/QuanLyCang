import { useState } from 'react'
import {signUp} from "../utils/userUtils.js";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast/index.jsx";

function Login() {
  const [login,setLogin] = useState("");
  const [password,setPassword] = useState("");
  const [toastData, setToastData] = useState({
    color: "",
    title: "",
    type: "",
  });
  const [alertState, setAlertState] = useState(false);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertState(false);
  };

  const handleOpen = (params) => {
    const data = {
      color: params.color,
      title: params.title,
      type: params.type,
    };
    setToastData(data);
    setAlertState(true);
  };

  const onLogin = async () => {
    const payload = {
        login:login,
        password:password
    }
    const data = await signUp(payload);
    if(data.errors != null){
        handleOpen({
            color: "red",
            title: `Đăng nhập thất bại`,
            type: "error",
          });
    }else{
        localStorage.setItem("token",data.data.signIn?.token)
        console.log("token",data)
        navigate("/")
    }     
  }
 
  return <>
   <Toast
        toastData={toastData}
        open={alertState}
        handleClose={() => handleClose()}
      />
      <body className="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail"  type="text" value={login} onChange = {(e) => setLogin(e.target.value)} placeholder="name@example.com" />
                                                <label htmlFor="inputEmail">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputPassword"value={password} onChange = {(e) => setPassword(e.target.value)}  type="password" placeholder="Password" />
                                                <label htmlFor="inputPassword">Password</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">Forgot Password?</a>
                                                <a className="btn btn-primary" onClick={() => onLogin()} >Login</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        </body>
  </> 
}

export default Login;
