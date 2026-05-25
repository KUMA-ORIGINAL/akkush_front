import { CardContent, CardMedia, CircularProgress } from "@mui/material"
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined"
import { productQueries } from "~entities/product"

const getProductImage = (photo) => {
	if (!photo) return "/mockup.png"

	return photo.startsWith("http")
		? photo
		: `https://asiya.tw1.su/${String(photo).replace(/^\/+/, "")}`
}

const OrderHistory = () => {
	const { data: productData, isLoading, isError } =
		productQueries.useGetCart()

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 py-16">
				<CircularProgress size={32} sx={{ color: "black" }} />

				<p className="text-sm uppercase tracking-[0.25em] text-gray-400">
					Загружаем историю покупок
				</p>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="rounded-[28px] border border-red-100 bg-red-50 p-8 text-center">
				<p className="text-red-500">
					Не удалось загрузить историю покупок
				</p>
			</div>
		)
	}

	const paidOrders =
		productData?.data?.filter(
			(order) => order.status === "оплачен"
		) || []

	if (paidOrders.length === 0) {
		return (
			<div className="rounded-[32px] border border-gray-100 bg-[#faf9f7] p-10 text-center">
				<ShoppingBagOutlinedIcon
					className="text-gray-300"
					sx={{ fontSize: 54 }}
				/>

				<h3 className="mt-4 font-serif text-2xl text-black">
					Покупок пока нет
				</h3>

				<p className="mt-2 text-gray-500">
					После оформления заказа он появится здесь.
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-5">
			{paidOrders.map((order) => (
				<div
					key={order.id}
					className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
				>
					{/* HEADER */}
					<div className="bg-gradient-to-br from-black to-neutral-700 p-5 text-white">
						<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
							<div>
								<p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
									Заказ
								</p>

								<h3 className="mt-2 font-serif text-3xl">
									#{order.id}
								</h3>
							</div>

							<div className="flex flex-wrap gap-3">
								<div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur min-w-[120px]">
									<div className="flex items-center gap-2 text-white/60">
										<CalendarMonthOutlinedIcon fontSize="small" />

										<span className="text-[10px] uppercase tracking-[0.15em]">
											Дата
										</span>
									</div>

									<p className="mt-2 text-sm font-medium">
										{new Date(
											order.createdAt
										).toLocaleDateString()}
									</p>
								</div>

								<div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur min-w-[150px]">
									<div className="flex items-center gap-2 text-white/60">
										<PaymentsOutlinedIcon fontSize="small" />

										<span className="text-[10px] uppercase tracking-[0.15em]">
											Сумма
										</span>
									</div>

									<p className="mt-2 text-3xl font-bold text-white leading-none">
										{order.totalPrice}
									</p>

									<p className="mt-1 text-xs text-white/60">
										сом
									</p>
								</div>

								<div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur min-w-[140px]">
									<div className="flex items-center gap-2 text-white/60">
										<LocalOfferOutlinedIcon fontSize="small" />

										<span className="text-[10px] uppercase tracking-[0.15em]">
											Скидка
										</span>
									</div>

									<p className="mt-2 text-2xl font-semibold text-white leading-none">
										{order.discount || 0}
									</p>

									<p className="mt-1 text-xs text-white/60">
										сом
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* PRODUCTS */}
					<CardContent className="!p-4 md:!p-5">
						<div className="space-y-3">
							{order.orderItems.map((item) => (
								<div
									key={item.product.id}
									className="flex items-center gap-4 rounded-3xl bg-[#faf9f7] p-3 transition-all duration-300 hover:bg-gray-100"
								>
									<CardMedia
										component="img"
										image={getProductImage(
											item.product.photo
										)}
										alt={item.product.name}
										onError={(event) => {
											event.currentTarget.src =
												"/mockup.png"
										}}
										className="h-20 w-20 rounded-2xl object-cover bg-white shrink-0"
									/>

									<div className="min-w-0 flex-1">
										<h4 className="truncate font-serif text-lg md:text-xl text-black">
											{item.product.name}
										</h4>

										<p className="mt-1 text-sm text-gray-500">
											Количество:{" "}
											<span className="font-medium text-black">
												{item.quantity}
											</span>
										</p>
									</div>

									<div className="text-right shrink-0">
										<p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
											Цена
										</p>

										<p className="mt-1 text-xl md:text-2xl font-bold text-black leading-none">
											{item.price}
										</p>

										<p className="mt-1 text-xs text-gray-400">
											сом
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</div>
			))}
		</div>
	)
}

export default OrderHistory