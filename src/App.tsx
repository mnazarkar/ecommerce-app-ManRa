import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/authActions";
import FullPageLoader from "./Components/FullPageLoader";
import { fetchUserCart } from "./actions/cartActions";

function App() {
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((state: any) => state.loader);
  const authState = useSelector((state: any) => state.auth);

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        await dispatch(getUser());
        await dispatch(fetchUserCart(authState.user?.id));
      }
    };

    initializeApp();
  }, [dispatch, authState.user?.id]);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;