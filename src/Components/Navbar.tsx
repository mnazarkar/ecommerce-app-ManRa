import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategories, fetchProductListByCategory, fetchProducts } from "../actions/productActions";
import { Menu, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch<any>();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { categories } = useSelector((state: any) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, []);

  console.log('cccc', categories);

  const handleCategoryClick = (category: string) => {
    // Implement category click logic, e.g., navigate to category page or filter products
    console.log('Category clicked:', category);
    dispatch(fetchProductListByCategory(category));
    setOpenMenu(false);
    navigate(`/products/${category}`);
  }

  const handleAllProductsClick = () => {
    dispatch(fetchProducts());
    setOpenMenu(false);
    navigate(`/products`);
  }


  return (
    <>
      <style>{`
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
      }
      .custom-scrollbar:hover {
        scrollbar-color: #d1d5db transparent;
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 3px;
      }
      .custom-scrollbar:hover::-webkit-scrollbar-thumb {
        background: #d1d5db;
      }
    `}</style>
      <Menu onClick={() => setOpenMenu(true)} className="cursor-pointer invert" />
      <div className={`fixed backdrop-blur top-0 left-0 w-full h-full bg-black/50 z-100 flex items-center justify-start transition-all duration-300 ease-in-out ${openMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpenMenu(false)}>
        <div className={`bg-white p-6 rounded shadow-lg h-full w-[80%] md:w-[30%] transition-transform duration-300 ease-in-out ${openMenu ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <div className="absolute top-0 left-0 w-full flex justify-between items-center mb-4 bg-linear-to-bl from-violet-500 to-fuchsia-500 py-3 px-4 rounded-tr">
            <h2 className="text-xl font-bold text-white">Categories</h2>
            <X className="cursor-pointer invert" onClick={() => setOpenMenu(false)} />
          </div>
          <div className="overflow-auto h-[calc(100%-48px)] custom-scrollbar mt-[52px]">
            <div key="all-products" className="p-[1px] rounded-full bg-gradient-to-bl from-violet-500 to-fuchsia-500 mb-1">
                <div className="relative p-2 rounded-full bg-white flex justify-center items-center group cursor-pointer transition-colors duration-200 hover:bg-gray-200"
                  onClick={handleAllProductsClick} >
                  <span className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                    All Products
                  </span>
                  <ArrowRight className="absolute right-2 w-4 h-4 stroke-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
            {categories?.map((category: string, index: number) => (
              <div key={index} className="p-[1px] rounded-full bg-gradient-to-bl from-violet-500 to-fuchsia-500 mb-1">
                <div className="relative p-2 rounded-full bg-white flex justify-center items-center group cursor-pointer transition-colors duration-200 hover:bg-gray-200"
                  onClick={() => handleCategoryClick(category)} >
                  <span className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                    {category}
                  </span>
                  <ArrowRight className="absolute right-2 w-4 h-4 stroke-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;