import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authActions";
import LoginModal from "../Components/LoginModal";
import { useEffect, useState } from "react";

const Login = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dispatch = useDispatch<any>();
  const authState = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (authState.isAuthenticated) {
      setShowLoginModal(false);
    }
  }, [authState.isAuthenticated]);

  useEffect(() => {
      !authState.isAuthenticated && setShowLoginModal(true);
  }, []);


  const getView = () => {
    if (authState.isAuthenticated) {
      return (
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={authState.user.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="text-xl font-bold mb-4">
            Welcome, {authState.user.firstName}!
          </div>
          <button
            className="bg-red-500 text-white p-2 rounded cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      );
    }else {
      return (
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <h2 className="text-2xl font-bold">Please login to continue</h2>
          <button className="flex px-6 py-2 rounded bg-black text-white cursor-pointer" onClick={()=> setShowLoginModal(true)}>Login</button>
        </div>
      );
    }
  };

  return (
    <>
     {getView()}
     {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Login;