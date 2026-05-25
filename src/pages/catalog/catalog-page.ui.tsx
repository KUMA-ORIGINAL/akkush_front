import { useState } from "react"
import {
	CircularProgress,
	TextField,
	InputAdornment,
	Checkbox,
	FormControlLabel,
	Button,
	Drawer,
	IconButton
} from "@mui/material"
import { Search, FilterList, ExpandMore, Close } from "@mui/icons-material"
import { productQueries } from "~entities/product"
import { Title } from "~shared/ui/title"
import ProductCard from "./../../entities/product/ui/Card"

export function CatalogPage() {
	const {
		data: productData,
		isLoading,
		isError
	} = productQueries.useGetProducts()

	const {
		data: categoriesData,
		isLoading: isCategoryLoading,
		isError: isCategoryError
	} = productQueries.useGetCategories()

	const [selectedCategories, setSelectedCategories] = useState([])
	const [openDropdown, setOpenDropdown] = useState(null)
	const [searchQuery, setSearchQuery] = useState("")
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	if (isLoading || isCategoryLoading) {
		return (
			<div className="flex flex-col items-center gap-4">
				<CircularProgress className="text-milk w-10 h-10" />
				<h3 className="text-milk font-semibold text-lg opacity-75">
					Загружаем данные...
				</h3>
			</div>
		)
	}

	if (isError || isCategoryError) {
		return (
			<div className="flex flex-col items-center gap-4">
				<h3 className="text-milk font-semibold text-lg opacity-75">
					Произошла ошибка при загрузке данных!
				</h3>
			</div>
		)
	}

	const handleCategoryChange = (category) => {
		const allCategoryIds = [
			category.id,
			...category.children.map((child) => child.id)
		]
		const newSelected = new Set(selectedCategories)
		allCategoryIds.forEach((id) => {
			if (newSelected.has(id)) {
				newSelected.delete(id)
			} else {
				newSelected.add(id)
			}
		})
		setSelectedCategories([...newSelected])
	}

	const filteredProducts =
		productData?.data?.results.filter((product) => {
			const matchesSearch =
				searchQuery === "" ||
				product.name.toLowerCase().includes(searchQuery.toLowerCase())

			const productCategoryIds = product.category.map((cat) => cat.id)
			const matchesCategory =
				selectedCategories.length === 0 ||
				productCategoryIds.some((id) => selectedCategories.includes(id))

			return matchesSearch && matchesCategory
		}) || []

	return (
		<div className="min-h-screen w-full p-6 md:p-10">
			<h2 className="font-serif   text-4xl text-black text-center mb-8 tracking-tight">
				Каталог Косметики
			</h2>
			<div className="flex items-center justify-between mb-4">
				<TextField
					fullWidth
					variant="outlined"
					placeholder="Поиск..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						)
					}}
				/>
				<IconButton
					className="ml-2 md:hidden"
					onClick={() => setIsFilterOpen(true)}
				>
					<FilterList />
				</IconButton>
			</div>
			<Drawer
				anchor="left"
				open={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
			>
				<div style={{ width: 300, padding: "4px" }}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							padding: "0px 10px",
							paddingTop: "20px"
						}}
					>
						<h3 style={{ fontWeight: "bold" }}>Фильтр</h3>
						<IconButton onClick={() => setIsFilterOpen(false)}>
							<Close />
						</IconButton>
					</div>
					{categoriesData?.data.map((category) => (
						<div key={category.id}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									cursor: "pointer",
									padding: "5px 10px"
								}}
								onClick={() =>
									setOpenDropdown(
										openDropdown === category.id ? null : category.id
									)
								}
							>
								<FormControlLabel
									control={
										<Checkbox
											checked={selectedCategories.includes(category.id)}
											onChange={() => handleCategoryChange(category)}
										/>
									}
									label={category.name}
								/>
								<ExpandMore
									style={{
										transform:
											openDropdown === category.id
												? "rotate(180deg)"
												: "rotate(0deg)",
										transition: "transform 0.3s ease"
									}}
								/>
							</div>
							{openDropdown === category.id && (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										paddingLeft: "25px"
									}}
								>
									{category.children.length > 0 ? (
										category.children.map((child) => (
											<FormControlLabel
												key={child.id}
												control={
													<Checkbox
														checked={selectedCategories.includes(child.id)}
														onChange={() => handleCategoryChange(child)}
													/>
												}
												label={child.name}
											/>
										))
									) : (
										<p style={{ padding: "0px 0px 20px 25px", color: "gray" }}>
											Нет подкатегорий
										</p>
									)}
								</div>
							)}
						</div>
					))}

					<Button
						style={{
							background: "#1A1A1A",
							boxShadow: "none",
							width: "85%",
							marginTop: "40px",
							borderRadius: 0,
							letterSpacing: "0.15em",
							textTransform: "uppercase",
							fontSize: "11px"
						}}
						variant="contained"
						onClick={() => setSelectedCategories([])}
					>
						Сбросить фильтры
					</Button>
				</div>
			</Drawer>

			<div className="flex flex-col md:flex-row md:justify-between gap-[50px] mt-10 items-start">
				<div className="hidden md:block w-64 p-6 bg-white border border-gray-100 flex-grow-0 max-h-screen overflow-auto">
					{categoriesData?.data.map((category) => (
						<div key={category.id}>
							<div
								className="flex items-center justify-between cursor-pointer py-2"
								onClick={() =>
									setOpenDropdown(
										openDropdown === category.id ? null : category.id
									)
								}
							>
								<FormControlLabel
									control={
										<Checkbox
											checked={selectedCategories.includes(category.id)}
											onChange={() => handleCategoryChange(category)}
										/>
									}
									label={category.name}
								/>
								<ExpandMore
									className={`transition-transform ${openDropdown === category.id ? "rotate-180" : ""}`}
								/>
							</div>
							{openDropdown === category.id && (
								<div className="pl-4">
									{category.children.length > 0 ? (
										category.children.map((child) => (
											<FormControlLabel
												key={child.id}
												control={
													<Checkbox
														checked={selectedCategories.includes(child.id)}
														onChange={() => handleCategoryChange(child)}
													/>
												}
												label={child.name}
											/>
										))
									) : (
										<p className="text-gray-500 pl-4">Нет подкатегорий</p>
									)}
								</div>
							)}
						</div>
					))}

					<Button
						className="bg-violet shadow-none w-full"
						variant="contained"
						onClick={() => setSelectedCategories([])}
					>
						Сбросить фильтры
					</Button>
				</div>

				<div className="md:w-[900px] flex flex-wrap gap-[10px]">
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))
					) : (
						<p className="text-gray-500">
							Нет товаров, соответствующих фильтрам.
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
