import { Formik, Form, ErrorMessage, useFormikContext, Field } from "formik"
import { Button, IconButton, TextField, CircularProgress } from "@mui/material"
import { useState } from "react"
import { withErrorBoundary } from "react-error-boundary"
import { ErrorHandler } from "~shared/ui/error"
import { userQueries } from "~entities/user"

const initialUser = {
	email: "",
	firstName: "",
	lastName: "",
	password: "",
	rePassword: "",
	birthdate: ""
}

function RegisterPageComponent() {
	const [visibility, setVisibility] = useState(false)
	const handleClickShowPassword = () => setVisibility((prev) => !prev)

	const {
		mutate: registerUser,
		isPending,
		isSuccess
	} = userQueries.useRegisterMutation()

	if (isSuccess)
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="bg-blush/30 text-black px-8 py-6 border border-blush shadow-sm text-center max-w-md">
					<p className="text-lg font-serif  ">
						На вашу почту отправлено письмо для подтверждения.
					</p>
					<p className="text-xs text-gray-400 mt-2 tracking-wide uppercase">
						Проверьте вашу почту
					</p>
				</div>
			</div>
		)

	return (
		<div className="min-h-[80vh] flex items-center justify-center px-4">
			<div className="w-full max-w-[420px] bg-white border border-gray-100 shadow-sm p-8 md:p-10">
				<div className="text-center mb-8">
					<h1 className="font-serif   text-3xl text-black tracking-tight">
						Создать аккаунт
					</h1>
					<p className="text-gray-400 text-sm mt-2 tracking-wide uppercase">
						Регистрация
					</p>
				</div>
				<Formik
					initialValues={initialUser}
					validate={validateForm}
					onSubmit={(user) => registerUser({ user })}
					validateOnMount={true}
				>
					{() => (
						<Form className="flex flex-col">
							<CustomField
								name="email"
								label="Email"
								type="email"
							/>
							<CustomField
								name="firstName"
								label="Имя"
							/>
							<CustomField
								name="lastName"
								label="Фамилия"
							/>
							<div>
								<p className="text-xs text-gray-400 tracking-wide uppercase mb-1">
									День рождения
								</p>
								<CustomField
									name="birthdate"
									type="date"
								/>
							</div>
							<CustomField
								name="password"
								label="Введите пароль"
								type={visibility ? "text" : "password"}
								endAdornment={
									<IconButton
										onClick={handleClickShowPassword}
										size="small"
									>
										{visibility ? "🙈" : "👁️"}
									</IconButton>
								}
							/>
							<CustomField
								name="rePassword"
								label="Подтвердите пароль"
								type={visibility ? "text" : "password"}
							/>
							{!isPending ? (
								<SubmitButton />
							) : (
								<div className="flex justify-center gap-2 border border-gray-200 mt-3 items-center p-3">
									<CircularProgress
										size={18}
										className="text-gray-400"
									/>
									<p className="text-gray-400 text-xs tracking-wide uppercase">
										Отправка данных...
									</p>
								</div>
							)}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

function CustomField({ name, label, type = "text", endAdornment }) {
	return (
		<div className="mb-4">
			<Field
				as={TextField}
				fullWidth
				id={name}
				name={name}
				label={label}
				type={type}
				size="small"
				InputProps={{ endAdornment }}
			/>
			<ErrorMessage
				name={name}
				component="div"
				className="text-xs text-[red] mt-1"
			/>
		</div>
	)
}

function SubmitButton() {
	const { isValid } = useFormikContext()
	return (
		<Button
			className="mt-3 bg-black shadow-none rounded-none tracking-widest uppercase text-xs py-3 hover:bg-gold hover:text-black transition-all duration-300"
			variant="contained"
			type="submit"
			fullWidth
			disabled={!isValid}
		>
			Зарегистрироваться
		</Button>
	)
}

const validateForm = (values) => {
	const errors = {}
	if (!values.email) errors.email = "Обязательное поле"
	if (!values.firstName) errors.firstName = "Обязательное поле"
	if (!values.lastName) errors.lastName = "Обязательное поле"
	if (!values.password || values.password.length < 6)
		errors.password = "Пароль должен содержать минимум 6 символов"
	if (values.password !== values.rePassword)
		errors.rePassword = "Пароли не совпадают"
	if (!values.birthdate) errors.birthdate = "Обязательное поле"
	return errors
}

export const RegisterPage = withErrorBoundary(RegisterPageComponent, {
	fallbackRender: ({ error }) => <ErrorHandler error={error} />
})
