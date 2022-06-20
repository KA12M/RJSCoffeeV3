import { useNavigate } from "react-router-dom";

export default () => {
  const navigation = useNavigate();

  const NavigateToBack = () => {
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
                  <img
                    className="mb-4 img-error"
                    src="../error-404-monochrome.svg"
                  />
                  <p className="lead">
                    This requested URL was not found on this server.
                  </p>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => NavigateToBack()}
                  >
                    <i className="fas fa-arrow-left me-1"></i>
                    Back to page
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
