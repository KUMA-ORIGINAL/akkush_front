import { FavoriteButton } from "~features/product-card/favorite-button"
import { CartButton } from "./../../../features/product-card/cart-button/cart-button.ui"
import { Link, useNavigate } from "react-router-dom"
import { pathKeys } from "~shared/lib/react-router"

function getProductImage(photo) {
	if (!photo) {
		return "/mockup.png"
	}

	if (photo.startsWith("http")) {
		return photo
	}

	return `https://asiya.tw1.su/${photo.replace(/^\/+/, "")}`
}

const ProductCard = ({ product }) => {
	const navigate = useNavigate()
	const productUrl = pathKeys.product(product.id)

	const openProduct = () => {
		navigate(productUrl)
	}

	return (
		<div
			key={product.id}
			className="relative w-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow md:w-64 h-70 group cursor-pointer"
			onClick={openProduct}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					openProduct()
				}
			}}
			role="link"
			tabIndex={0}
		>
			<Link
				to={productUrl}
				className="block no-underline"
				onClick={(event) => event.stopPropagation()}
			>
				<img
					src={getProductImage(product.photo)}
					alt={product.name}
					className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
					onError={(event) => {
						event.currentTarget.src = "/mockup.png"
					}}
				/>
			</Link>
			<div className="p-4 flex flex-col gap-2 flex-1">
				<Link
					to={productUrl}
					className="no-underline"
					onClick={(event) => event.stopPropagation()}
				>
					<h3 className="text-lg font-serif   text-black font-semibold truncate leading-tight">
						{product.name}
					</h3>
					<p className="text-sm text-gray-500 mt-1 flex items-start gap-[2px] font-medium tracking-wide">
						{Math.floor(product.price)}
						<img
							src="/som.png"
							alt="currency"
							className="w-[18px] h-[18px] opacity-70"
						/>
					</p>
				</Link>
				<div
					className="mt-auto flex items-center justify-between"
					onClick={(event) => event.stopPropagation()}
				>
					{/* <button className="px-4 py-1 bg-blue-600 border text-violet hover:bg-violet transition-all duration-300 hover:text-white border-violet rounded-lg flex items-center gap-2">
              <ShoppingCartIcon fontSize="small" className="text-inherit" />В корзину
            </button> */}
					<CartButton product={product} />
					<FavoriteButton id={product.id} />
				</div>
			</div>
		</div>
	)
}

export default ProductCard
