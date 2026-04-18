import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/authActions";
import FullPageLoader from "./Components/FullPageLoader";

function App() {
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((state: any) => state.loader);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;