import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GradientHeartFilled, GradientHeartOutline } from '../Pages/GradientHeart';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../store/wishlistSlice';

type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
};

const ProductCard = ({ p, extraClass }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [animatingId, setAnimatingId] = useState<number | null>(null);

    const wishlist = useSelector((state: any) => state.wishlist);

    const isWishlisted = (id: number) =>
        wishlist.some((item: any) => item.id === id);

    const handleWishlistClick = (product: Product) => {
        setAnimatingId(product.id);
        dispatch(toggleWishlist(product));

        setTimeout(() => setAnimatingId(null), 200);
    };
    return (
        <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className={`group bg-white rounded-2xl overflow-hidden shadow-md p-3 cursor-pointer shadow hover:shadow-2xl transition duration-300 min-w-[164px] md:min-w-[240px] min-h-[372px] ${extraClass}`}
        >
            <div className="relative overflow-hidden">
                <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="h-60 w-full object-fill bg-linear-to-bl from-mauve-400 to-indigo-200 rounded-md md:group-hover:scale-110 transition duration-500"
                    loading="lazy"
                />
                <span className="absolute bottom-2 left-2 px-1 text-sm rounded bg-white/80">
                    <span className="flex flex-row items-center justify-center gap-1 bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-black">|</span>
                        {p.rating}
                    </span>
                </span>
                <span
                    className={`absolute top-2 right-2 p-1 rounded-full bg-white/80 cursor-pointer
                  transition-all duration-300
                  ${(animatingId === p.id && isWishlisted(p.id)) ? "scale-115" : "scale-100"}
                `}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistClick(p);
                    }}
                >
                    {isWishlisted(p.id) ? (
                        <GradientHeartFilled />
                    ) : (
                        <GradientHeartOutline />
                    )}
                </span>
            </div>
            <h3 className="font-medium line-clamp-2 md:group-hover:bg-gradient-to-bl from-violet-500 to-fuchsia-500 md:group-hover:bg-clip-text md:group-hover:text-transparent transition">
                {p.title}
            </h3>
            <p className="text-gray-500 text-sm capitalize">
                {p.category}
            </p>
            <div className="flex items-start gap-2 flex-col mt-2">
                <div className="flex gap-2 items-center justify-center">
                    <span className="text-gray-400 line-through text-sm">
                        ₹{p.price.toFixed(2)}
                    </span>
                    <span className="text-green-600 text-xs font-medium">
                        {p.discountPercentage}% OFF
                    </span>
                </div>
                <span className="text-lg font-bold text-black">
                    ₹{(p.price - (p.price * p.discountPercentage) / 100).toFixed(2)}
                </span>

            </div>
        </div>
    );
};

export default ProductCard;