import { useState, useEffect } from "react"
import {
	AppBar,
	Toolbar,
	IconButton,
	Tooltip,
	Badge,
	Drawer
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
// import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import { Link, useNavigate } from "react-router-dom"
import { pathKeys } from "~shared/lib/react-router"
import { getCookie } from "typescript-cookie"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const menuItems = [
	{ label: "Каталог", to: pathKeys.catalog() },
	{ label: "О нас", to: pathKeys.about() }
]

export function Header() {
	const [isAuth, setIsAuth] = useState(
		!!getCookie("access") && getCookie("access") !== "undefined"
	)
	const [menuOpen, setMenuOpen] = useState(false)
	const [cartQuantity, setCartQuantity] = useState(0) // To store the total cart quantity
	const navigate = useNavigate()

	useEffect(() => {
		const checkAuth = () => {
			setIsAuth(!!getCookie("access") && getCookie("access") !== "undefined")
		}

		checkAuth()
	}, [])
	const handleMenuClick = () => {
		setMenuOpen(true)
	}

	const handleCloseMenu = () => {
		setMenuOpen(false)
	}

	const calculateCartQuantity = () => {
		// Retrieve cart data from localStorage
		const cartData = JSON.parse(localStorage.getItem("CARTStorage") || "{}")
		// Calculate the total quantity of items in the cart
		return Object.values(cartData).reduce((sum, item) => sum + item.quantity, 0)
	}

	useEffect(() => {
		// Set initial cart quantity
		setCartQuantity(calculateCartQuantity())

		// Listen for changes in localStorage and update cart quantity
		const handleStorageChange = () => {
			setCartQuantity(calculateCartQuantity())
		}

		window.addEventListener("storage", handleStorageChange)

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [])

	return (
		<AppBar
			position="sticky"
			elevation={0}
			className="bg-black backdrop-blur-md shadow-sm font-medium px-4 md:px-20 border-b border-gray-100 top-0 z-50 text-black transition-all"
		>
			<Toolbar className="relative flex justify-between w-full">
				<div className="flex items-center gap-5">
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleMenuClick}
						aria-label="Открыть меню"
					>
						<MenuIcon className="text-white" />
					</IconButton>
					<Link
						to={pathKeys.home()}
						className=" flex items-center gap-2"
					>
						<img
							src="/2.png"
							className="w-[50px] object-cover h-[50px] rounded-md"
							alt="Logo"
						/>
						{/* <h3 className="text-black">Ак Куш</h3> */}
					</Link>
				</div>
				<Link to={pathKeys.home()}>
					<h3 className="text-white uppercase text-[30px] font-play">
						Ak Kush
					</h3>
				</Link>
				<div className="flex items-center gap-1">
					<Tooltip title="Избранное">
						<IconButton
							onClick={() => navigate("/favorites")}
							color="inherit"
						>
							<FavoriteRoundedIcon className="text-violet" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Корзина">
						<IconButton
							onClick={() => navigate("/cart")}
							color="inherit"
						>
							<Badge
								badgeContent={cartQuantity} // Set the badge content to the cart quantity
								color="secondary"
							>
								<ShoppingCartIcon className="text-violet" />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title={isAuth ? "Личный кабинет" : "Войти"}>
						<IconButton
							onClick={() =>
								navigate(isAuth ? pathKeys.profile() : pathKeys.login())
							}
							color="inherit"
							className="transition-transform hover:scale-105 active:scale-95"
						>
							<PersonRoundedIcon className="text-violet" />
						</IconButton>
					</Tooltip>
				</div>
				<Drawer
					anchor="left"
					open={menuOpen}
					onClose={handleCloseMenu}
					PaperProps={{
						sx: {
							width: 280,
							backgroundColor: "black",
							color: "white"
						}
					}}
				>
					<nav
						style={{ display: "flex", flexDirection: "column", height: "100%" }}
					>
						<div
							style={{
								alignItems: "center",
								borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
								display: "flex",
								justifyContent: "space-between",
								padding: "16px 20px"
							}}
						>
							<Link
								to={pathKeys.home()}
								onClick={handleCloseMenu}
								style={{
									alignItems: "center",
									display: "flex",
									gap: 12,
									textDecoration: "none"
								}}
							>
								<img
									src="/2.png"
									style={{
										borderRadius: 6,
										height: 50,
										objectFit: "cover",
										width: 50
									}}
									alt="Logo"
								/>
								<span
									style={{
										color: "white",
										fontFamily: "'Playfair Display', serif",
										fontSize: 30,
										textTransform: "uppercase"
									}}
								>
									Ak Kush
								</span>
							</Link>
							<IconButton
								color="inherit"
								onClick={handleCloseMenu}
								aria-label="Закрыть меню"
							>
								<CloseIcon className="text-white" />
							</IconButton>
						</div>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								padding: "16px 0"
							}}
						>
							{menuItems.map((item) => (
								<Link
									key={item.to}
									to={item.to}
									onClick={handleCloseMenu}
									style={{
										color: "white",
										fontSize: 14,
										fontWeight: 600,
										letterSpacing: "0.12em",
										padding: "16px 20px",
										textDecoration: "none",
										textTransform: "uppercase"
									}}
								>
									{item.label}
								</Link>
							))}
						</div>
					</nav>
				</Drawer>
			</Toolbar>
		</AppBar>
	)
}
