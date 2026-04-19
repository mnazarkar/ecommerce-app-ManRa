import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductCategories } from "../actions/productActions";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch<any>();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, []);

  return (
    <>
    <Menu onClick={()=> setOpenMenu(true)} className="cursor-pointer"/>
      {openMenu && <div className="fixed backdrop-blur top-0 left-0 w-full h-full bg-black/50 z-100 flex items-center justify-start" onClick={()=> setOpenMenu(false)}>
        <div className="bg-white p-6 rounded shadow-lg h-full w-[80%] md:w-[30%]">
          <h2 className="text-xl font-bold mb-4">Menu</h2> 
        </div>
        <X className="cursor-pointer invert absolute left-[81%] md:left-[31%] top-[10px]"/>
      </div>
    }
    
    </>
  );
};

export default Navbar;