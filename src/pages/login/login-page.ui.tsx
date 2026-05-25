import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik"
import { userContracts, userQueries, userTypes } from "~entities/user"
import { Button, IconButton, TextField } from "@mui/material"
import { pathKeys } from "~shared/lib/react-router"
import { formikContract } from "~shared/lib/zod"
import { withErrorBoundary } from "react-error-boundary"
import { ErrorHandler } from "~shared/ui/error"
import { Link } from "react-router-dom"
import { useState } from "react"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

function Page() {
	const [visibility, setVisibility] = useState(false)

	const handleClickShowPassword = () =>
		setVisibility((visibility) => !visibility)

	const {
		mutate: loginToken,
		isPending,
		isError
	} = userQueries.useGetTokenMutation()

	return (
		<div className="min-h-[80vh] flex items-center justify-center px-4">
			<div className="w-full max-w-[420px] bg-white border border-gray-100 shadow-sm p-8 md:p-10">
				<div className="text-center mb-8">
					<h1 className="font-serif   text-3xl text-black tracking-tight">
						Добро пожаловать
					</h1>
					<p className="text-gray-400 text-sm mt-2 tracking-wide uppercase">
						Войдите в личный кабинет
					</p>
				</div>
				<Formik
					initialValues={initialUser}
					validate={validateForm}
					onSubmit={(user) => loginToken({ user })}
				>
					<Form>
						<fieldset
							disabled={isPending}
							className="text-xs text-[red]"
						>
							<fieldset className="my-5">
								<Field
									as={TextField}
									fullWidth
									id="email"
									name="email"
									label="Псевдоним или email"
									size="small"
									className="rounded-none"
								/>
								<ErrorMessage name="email" />
							</fieldset>
							<fieldset className="my-5">
								<Link
									className="block font-medium text-gold text-right mb-2 text-xs tracking-wide uppercase hover:text-black transition-colors"
									to={pathKeys.forgotPassword()}
								>
									Восстановить пароль
								</Link>
								<Field
									as={TextField}
									fullWidth
									id="password"
									name="password"
									label="Пароль"
									type={visibility ? "text" : "password"}
									size="small"
									InputProps={{
										endAdornment: (
											<IconButton
												aria-label="password-visibility"
												size="small"
												color="info"
												onClick={handleClickShowPassword}
											>
												{visibility ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										)
									}}
								/>
								<ErrorMessage name="password" />
							</fieldset>
						</fieldset>
						{isPending ? (
							<Button
								variant="contained"
								disabled
								className="text-center bg-gray-200 w-full rounded-none shadow-none tracking-widest uppercase text-xs py-3"
							>
								Выполняется вход...
							</Button>
						) : (
							<SubmitButton />
						)}
					</Form>
				</Formik>

				{isError && (
					<p className="text-center text-xs text-[red] mt-3">
						Ошибка при выполнении запроса
					</p>
				)}
				<p className="text-sm flex items-center justify-center mt-6 gap-1 text-gray-400">
					Нет аккаунта?
					<Link
						className="font-semibold text-black hover:text-gold transition-colors"
						to={pathKeys.register()}
					>
						Зарегистрируйтесь
					</Link>
				</p>
			</div>
		</div>
	)
}

const initialUser: userTypes.LoginUserDto = {
	email: "",
	password: ""
}

function SubmitButton() {
	const { isValidating, isValid } = useFormikContext()
	return (
		<Button
			variant="contained"
			type="submit"
			className="w-full mb-2 bg-black shadow-none rounded-none tracking-widest uppercase text-xs py-3 hover:bg-gold hover:text-black transition-all duration-300"
			disabled={!isValid || isValidating}
		>
			Войти
		</Button>
	)
}

const validateForm = formikContract(userContracts.LoginUserDtoSchema)

export const LoginPage = withErrorBoundary(Page, {
	fallbackRender: ({ error }) => <ErrorHandler error={error} />
})
