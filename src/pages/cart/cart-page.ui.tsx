import { useState, useEffect } from 'react'
import {
	CircularProgress,
	Button,
	Checkbox,
	IconButton,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { getCookie } from 'typescript-cookie'
import AddBoxIcon from '@mui/icons-material/AddBox'
import RemoveIcon from '@mui/icons-material/Remove'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'

import { productQueries } from '~entities/product'
import { userQueries } from '~entities/user'

export function CartPage() {
	const isAuth =
		!!getCookie('access') && getCookie('access') !== 'undefined'

	const [cart, setCart] = useState({})
	const [totalPrice, setTotalPrice] = useState(0)
	const [oldTotalPrice, setOldTotalPrice] = useState(0)
	const [freeCases, setFreeCases] = useState([])
	const [city, setCity] = useState('')
	const [address, setAddress] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const {
		mutate: placeOrder,
		isPending,
		isSuccess,
	} = productQueries.useCreateOrder()

	const { data: userData } = userQueries.useLoginUserQuery()

	const navigate = useNavigate()

	useEffect(() => {
		const storedCart =
			JSON.parse(localStorage.getItem('CARTStorage')) || {}

		setCart(storedCart)
	}, [])

	useEffect(() => {
		if (userData) {
			updateTotal(cart, userData, freeCases)
		}
	}, [cart, userData, freeCases])

	const updateTotal = (cartData, user, freeCasesList) => {
		const baseTotal = Object.values(cartData).reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		)

		const birthdayDiscount = user?.data?.birthdayDiscount || 0

		const welcomeDiscount =
			user?.data?.cluster === 'K4'
				? user?.data?.welcomeDiscount || 0
				: 0

		const totalDiscount = Math.min(
			birthdayDiscount + welcomeDiscount,
			100
		)

		const discountedTotal =
			baseTotal * (1 - totalDiscount / 100)

		const freeCasesTotal = Object.values(cartData)
			.filter((item) => freeCasesList.includes(item.id))
			.reduce((sum, item) => sum + item.price, 0)

		setOldTotalPrice(baseTotal)
		setTotalPrice(discountedTotal - freeCasesTotal)
	}

	const handleQuantityChange = (id, type) => {
		const updatedCart = { ...cart }

		const product = updatedCart[id]

		if (type === 'increase') {
			product.quantity += 1
		} else if (
			type === 'decrease' &&
			product.quantity > 1
		) {
			product.quantity -= 1
		} else if (
			type === 'decrease' &&
			product.quantity === 1
		) {
			delete updatedCart[id]
		}

		setCart(updatedCart)

		localStorage.setItem(
			'CARTStorage',
			JSON.stringify(updatedCart)
		)
	}

	const handleFreeCaseChange = (id) => {
		setFreeCases((prev) =>
			prev.includes(id)
				? prev.filter((item) => item !== id)
				: prev.length <
				  (userData?.data?.freeCases || 0)
				? [...prev, id]
				: prev
		)
	}

	const handleOrder = () => {
		const orderItems = Object.values(cart).map(
			(item) => ({
				product: item.id,
				quantity: item.quantity,
				isFree:
					item.isCase &&
					freeCases.includes(item.id),
			})
		)

		if (
			orderItems.length > 0 &&
			city &&
			address &&
			phoneNumber
		) {
			placeOrder({
				orderItems,
				city,
				address,
				phoneNumber,
			})
		} else {
			alert('Пожалуйста, заполните все поля доставки')
		}
	}

	useEffect(() => {
		if (isSuccess) {
			localStorage.removeItem('CARTStorage')

			navigate('/order')
		}
	}, [isSuccess, navigate])

	if (!isAuth) {
		return (
			<div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
				<div className="bg-white border border-gray-100 rounded-[32px] shadow-sm p-10 max-w-md w-full">
					<h2 className="text-4xl font-light tracking-wide text-black">
						Корзина
					</h2>

					<p className="mt-4 text-gray-500 leading-7">
						Для оформления заказа необходимо
						войти в аккаунт
					</p>

					<Link
						to="/login"
						className="mt-8 inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-full hover:bg-neutral-800 transition-all duration-300 text-sm tracking-[0.2em] uppercase"
					>
						Войти
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen ">
			<div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* LEFT */}
					<div className="flex-1">
						<h1 className="text-5xl font-light tracking-tight text-black">
							Корзина
						</h1>

						<p className="mt-3 text-gray-500">
							{Object.keys(cart).length} товаров
						</p>

						{Object.keys(cart).length === 0 ? (
							<div className="bg-white mt-8 rounded-[32px] p-16 text-center border border-gray-100">
								<p className="text-gray-400 text-lg">
									Ваша корзина пуста
								</p>
							</div>
						) : (
							<div className="mt-8 flex flex-col gap-5">
								{Object.values(cart).map((item) => (
									<div
										key={item.id}
										className="bg-white rounded-[30px] p-5 md:p-7 border border-gray-100 hover:shadow-xl transition-all duration-500"
									>
										<div className="flex flex-col md:flex-row md:items-center gap-6">
											<img
												src={
													typeof item.photo ===
														'string' &&
													item.photo.startsWith(
														'http'
													)
														? item.photo
														: item.photo
														? `https://asiya.tw1.su/${String(
																item.photo
														  ).replace(
																/^\/+/,
																''
														  )}`
														: '/mockup.png'
												}
												alt={item.name}
												className="w-full md:w-32 h-40 md:h-32 object-cover rounded-2xl bg-gray-100"
											/>

											<div className="flex-1">
												<h3 className="text-2xl font-light text-black">
													{item.name}
												</h3>

												<p className="mt-2 text-gray-500">
													{item.price} сом
												</p>

												{item.isCase &&
													userData?.data?.freeCases >
														0 && (
														<label className="mt-4 flex items-center gap-2 text-sm text-gray-600">
															<Checkbox
																checked={freeCases.includes(
																	item.id
																)}
																onChange={() =>
																	handleFreeCaseChange(
																		item.id
																	)
																}
															/>
															Использовать как
															бесплатный товар
														</label>
													)}
											</div>

											<div className="flex items-center justify-between md:flex-col gap-5">
												<div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
													<IconButton
														onClick={() =>
															handleQuantityChange(
																item.id,
																'decrease'
															)
														}
													>
														<RemoveIcon />
													</IconButton>

													<span className="w-8 text-center font-medium">
														{item.quantity}
													</span>

													<IconButton
														onClick={() =>
															handleQuantityChange(
																item.id,
																'increase'
															)
														}
													>
														<AddBoxIcon />
													</IconButton>
												</div>

												<p className="text-xl font-semibold">
													{item.price *
														item.quantity}{' '}
													сом
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* RIGHT */}
					{Object.keys(cart).length > 0 && (
						<div className="w-full lg:w-[420px]">
							<div className="sticky top-10 bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
								<h2 className="text-3xl font-light">
									Оформление
								</h2>

								<div className="mt-8 space-y-4">
									<input
										type="text"
										placeholder="Город"
										value={city}
										onChange={(e) =>
											setCity(e.target.value)
										}
										className="w-full h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-black transition-all"
									/>

									<input
										type="text"
										placeholder="Адрес доставки"
										value={address}
										onChange={(e) =>
											setAddress(e.target.value)
										}
										className="w-full h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-black transition-all"
									/>

									<input
										type="tel"
										placeholder="Номер телефона"
										value={phoneNumber}
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
										className="w-full h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-black transition-all"
									/>
								</div>

								<div className="mt-8 pt-6 border-t border-gray-100">
									<div className="flex items-center justify-between">
										<span className="text-gray-500">
											Сумма
										</span>

										<div className="text-right">
											{oldTotalPrice >
											totalPrice ? (
												<>
													<p className="text-sm line-through text-gray-400">
														{oldTotalPrice.toFixed(
															2
														)}{' '}
														сом
													</p>

													<p className="text-3xl font-semibold">
														{totalPrice.toFixed(
															2
														)}{' '}
														сом
													</p>
												</>
											) : (
												<p className="text-3xl font-semibold">
													{totalPrice.toFixed(
														2
													)}{' '}
													сом
												</p>
											)}
										</div>
									</div>

									<div className="mt-5 space-y-2">
										{userData?.data
											?.birthdayDiscount >
											0 && (
											<p className="text-sm text-emerald-600">
												Скидка ко дню рождения
											</p>
										)}

										{userData?.data
											?.cluster === 'K4' &&
											userData?.data
												?.welcomeDiscount >
												0 && (
												<p className="text-sm text-emerald-600">
													Приветственная скидка{' '}
													{
														userData.data
															.welcomeDiscount
													}
													%
												</p>
											)}
									</div>

									<Button
										variant="contained"
										fullWidth
										onClick={handleOrder}
										className="!mt-8 !h-14 !rounded-full !bg-black !shadow-none hover:!bg-neutral-800"
									>
										{isPending ? (
											<CircularProgress
												size={24}
												sx={{ color: 'white' }}
											/>
										) : (
											'Оформить заказ'
										)}
									</Button>

									<div className="mt-8 space-y-4">
										<div className="flex items-center gap-3 text-sm text-gray-500">
											<LocalShippingOutlinedIcon fontSize="small" />
											Быстрая доставка
										</div>

										<div className="flex items-center gap-3 text-sm text-gray-500">
											<WorkspacePremiumOutlinedIcon fontSize="small" />
											Только оригинальная продукция
										</div>

										<div className="flex items-center gap-3 text-sm text-gray-500">
											<LockOutlinedIcon fontSize="small" />
											Безопасная оплата
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}