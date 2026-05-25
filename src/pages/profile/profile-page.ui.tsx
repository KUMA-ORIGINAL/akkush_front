import {
	Button,
	TextField,
	CircularProgress,
	Avatar,
	Divider
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import LogoutIcon from "@mui/icons-material/Logout"
import LoyaltyIcon from "@mui/icons-material/Loyalty"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import { useEffect, useState } from "react"
import { removeCookie } from "typescript-cookie"
import { Link, useNavigate } from "react-router-dom"
import { pathKeys } from "~shared/lib/react-router"
import { ModalPopup } from "~widgets/modal-popup"
import OrderHistory from "./OrderHistory"
import $api from "../../shared/api/index"

import {
	ErrorMessage,
	Field,
	Form,
	Formik,
	FormikValues,
	useFormikContext
} from "formik"
import { toast } from "react-toastify"

export async function editUserProfile(params) {
	return $api.patch("users/me/", params)
}

export function ProfilePage() {
	const [active, setActive] = useState(false)
	const navigate = useNavigate()
	const [userData, setUserData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState(false)

	useEffect(() => {
		async function fetchUserData() {
			try {
				const response = await $api.get("users/me")
				setUserData(response.data)
			} catch (err) {
				setError("Ошибка загрузки данных")
			} finally {
				setLoading(false)
			}
		}

		fetchUserData()
	}, [])

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#faf9f7]">
				<CircularProgress
					size={36}
					sx={{ color: "black" }}
				/>

				<p className="text-sm uppercase tracking-[0.25em] text-gray-400">
					Загружаем профиль
				</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center px-4">
				<div className="rounded-[28px] bg-white border border-red-100 p-8 text-center shadow-sm">
					<p className="text-red-500">{error}</p>
				</div>
			</div>
		)
	}

	const handleLogout = () => {
		removeCookie("access")
		localStorage.removeItem("refreshMilcase")
		localStorage.removeItem("CARTStorage")
		navigate(`${pathKeys.home()}`)
	}

	const { email, firstName, lastName, points } = userData

	const initialUser = {
		email,
		firstName,
		lastName
	}

	const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`

	const handleEditProfile = async (values) => {
		setIsPending(true)

		try {
			await editUserProfile(values)

			const response = await $api.get("users/me")

			setUserData(response.data)
			setActive(false)

			toast.success("Профиль успешно обновлён!", {
				position: "top-right",
				autoClose: 3000
			})
		} catch (err) {
			toast.error("Ошибка при обновлении профиля!", {
				position: "top-right",
				autoClose: 3000
			})

			console.error("Ошибка обновления профиля", err)
		} finally {
			setIsPending(false)
		}
	}

	return (
		<div className="min-h-screen  px-4 py-12">
			<div className="max-w-5xl mx-auto">
				{/* TITLE */}
				<div className="mb-10 text-center">
					<p className="text-xs uppercase tracking-[0.35em] text-gray-400">
						Ak Kush Account
					</p>

					<h1 className="mt-4 font-serif text-4xl md:text-5xl text-black">
						Личный кабинет
					</h1>
				</div>

				{/* PROFILE */}
				<section className="overflow-hidden rounded-[36px] bg-white border border-gray-100 shadow-sm">
					<div className="relative bg-gradient-to-br from-black to-neutral-700 px-8 py-12 text-white">
						<div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

						<div className="relative flex flex-col items-center text-center">
							<Avatar
								sx={{
									width: 110,
									height: 110,
									bgcolor: "white",
									color: "black",
									fontSize: 38
								}}
							>
								{initials}
							</Avatar>

							<h2 className="mt-6 font-serif text-4xl leading-tight">
								{firstName} {lastName}
							</h2>

							<p className="mt-3 text-white/70">{email}</p>
						</div>
					</div>

					<div className="p-6 md:p-8">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="rounded-3xl bg-[#faf9f7] p-5">
								<div className="flex items-center gap-3 text-gray-500">
									<PersonOutlineIcon fontSize="small" />

									<span className="text-sm">Профиль</span>
								</div>

								<p className="mt-3 text-lg font-medium text-black">
									{firstName} {lastName}
								</p>
							</div>

							<div className="rounded-3xl bg-[#faf9f7] p-5">
								<div className="flex items-center gap-3 text-gray-500">
									<MailOutlineIcon fontSize="small" />

									<span className="text-sm">Email</span>
								</div>

								<p className="mt-3 text-lg font-medium text-black break-all">
									{email}
								</p>
							</div>

							{/* {points !== undefined && (
								<div className="rounded-3xl bg-[#faf9f7] p-5">
									<div className="flex items-center gap-3 text-gray-500">
										<LoyaltyIcon fontSize="small" />

										<span className="text-sm">Бонусные баллы</span>
									</div>

									<p className="mt-3 text-3xl font-bold text-black">{points}</p>
								</div>
							)} */}
						</div>

						<Divider className="!my-8" />

						<div className="flex flex-col md:flex-row gap-3">
							<Button
								fullWidth
								variant="contained"
								startIcon={<EditIcon />}
								onClick={() => setActive(true)}
								className="!h-12 !rounded-full !bg-black !shadow-none hover:!bg-neutral-800"
							>
								Редактировать
							</Button>


							<Button
								fullWidth
								variant="outlined"
								startIcon={<LogoutIcon />}
								onClick={handleLogout}
								className="!h-12 !rounded-full !border-gray-200 !text-gray-600 hover:!border-black hover:!text-black"
							>
								Выйти
							</Button>
						</div>
					</div>
				</section>

				{/* ORDER HISTORY */}
				<section className="mt-8 rounded-[36px] bg-white border border-gray-100 shadow-sm p-6 md:p-8">
					<div className="mb-6">
						<h2 className="font-serif text-3xl text-black">История заказов</h2>

						<p className="mt-2 text-gray-500">
							Здесь отображаются ваши покупки и статусы заказов.
						</p>
					</div>

					<OrderHistory />
				</section>
			</div>

			{/* MODAL */}
			<ModalPopup
				active={active}
				setActive={setActive}
			>
				<div className="p-2">
					<h2 className="mb-6 font-serif text-3xl text-black">
						Редактировать профиль
					</h2>

					<Formik
						initialValues={initialUser}
						validate={validateForm}
						onSubmit={(values) => {
							handleEditProfile({
								email: values.email,
								firstName: values.firstName,
								lastName: values.lastName
							})
						}}
					>
						<Form>
							<fieldset className="space-y-5 border-0 p-0 m-0">
								<div>
									<Field
										as={TextField}
										fullWidth
										id="email"
										name="email"
										label="Email"
										size="small"
									/>

									<ErrorMessage
										name="email"
										component="div"
										className="mt-1 text-xs text-red-500"
									/>
								</div>

								<div>
									<Field
										as={TextField}
										fullWidth
										id="firstName"
										name="firstName"
										label="Имя"
										size="small"
									/>

									<ErrorMessage
										name="firstName"
										component="div"
										className="mt-1 text-xs text-red-500"
									/>
								</div>

								<div>
									<Field
										as={TextField}
										fullWidth
										id="lastName"
										name="lastName"
										size="small"
										label="Фамилия"
									/>

									<ErrorMessage
										name="lastName"
										component="div"
										className="mt-1 text-xs text-red-500"
									/>
								</div>
							</fieldset>

							<SubmitButton isPending={isPending} />
						</Form>
					</Formik>
				</div>
			</ModalPopup>
		</div>
	)
}

function SubmitButton({ isPending }) {
	const { isValidating, isValid } = useFormikContext()

	return (
		<Button
			variant="contained"
			className="!mt-6 !h-12 !rounded-full !bg-black !shadow-none hover:!bg-neutral-800"
			fullWidth
			type="submit"
			disabled={!isValid || isValidating || isPending}
		>
			{isPending ? (
				<CircularProgress
					size={20}
					sx={{ color: "white" }}
				/>
			) : (
				"Сохранить изменения"
			)}
		</Button>
	)
}

const validateForm = (values) => {
	const errors: Partial<FormikValues> = {}

	if (!values.email) {
		errors.email = "Обязательное поле"
	} else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
		errors.email = "Неправильный формат email"
	}

	if (!values.firstName) {
		errors.firstName = "Обязательное поле"
	}

	if (!values.lastName) {
		errors.lastName = "Обязательное поле"
	}

	return errors
}
