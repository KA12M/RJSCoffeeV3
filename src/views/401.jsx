import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as accountActions from "../actions/account.action";

export default () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const onGotoSignIn = () => {
    dispatch(accountActions.clear());
    localStorage.removeItem("token");
    navigation("/");
  };
  return (
    <div id="layoutError">
      <div id="layoutError_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center mt-4">
                  <h1 className="display-1">401</h1>
                  <p className="lead">Unauthorized</p>
                  <p>Access to this resource is denied.</p>
                  <a href="#" onClick={onGotoSignIn}>
                    <i className="fas fa-arrow-left me-1"></i>
                    Go to Sign in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
