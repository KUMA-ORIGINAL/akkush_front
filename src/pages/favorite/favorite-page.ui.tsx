import { CircularProgress } from "@mui/material"
import { productQueries } from "~entities/product"
import { Title } from "~shared/ui/title"
import ProductCard from "./../../entities/product/ui/Card"
import { Link } from "react-router-dom"
import { getCookie } from "typescript-cookie"

export function FavoritePage() {
	const isAuth = !!getCookie("access") && getCookie("access") !== "undefined"
	const {
		data: productData,
		isLoading,
		isError
	} = productQueries.useGetFavoriteProducts()

	if (!isAuth) {
		return (
			<div className="text-center text-gray-500 min-h-[60vh] flex flex-col items-center justify-center">
				<p className="mb-6 font-serif   text-xl">Необходима авторизация.</p>
				<Link
					to="/login"
					className="bg-black text-white px-8 py-3 font-semibold tracking-widest uppercase text-xs hover:bg-gold hover:text-black transition-all duration-300 inline-block"
				>
					Войти
				</Link>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="flex flex-col items-center gap-4">
				<CircularProgress className="text-milk w-10 h-10" />
				<h3 className="text-milk font-semibold text-lg opacity-75">
					Загружаем данные...
				</h3>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center gap-4">
				<h3 className="text-milk font-semibold text-lg opacity-75">
					Произошла ошибка при загрузке данных!
				</h3>
			</div>
		)
	}

	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="container mx-auto px-4 py-10">
				<h2 className="font-serif   text-4xl text-black text-center mb-8 tracking-tight">
					Мои избранные товары
				</h2>
				{productData.data.favoriteProducts.length > 0 ? (
					<div className=" flex flex-wrap gap-5">
						{productData.data.favoriteProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))}
					</div>
				) : (
					<div className="text-center text-gray-600">
						<p className="mb-4">У вас нет товаров в избранном.</p>
						<Link
							to="/"
							className="bg-black text-white px-8 py-3 font-semibold tracking-widest uppercase text-xs hover:bg-gold hover:text-black transition-all duration-300 inline-block"
						>
							Вернуться на главную
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
