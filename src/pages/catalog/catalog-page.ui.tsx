import { useEffect, useMemo, useState } from "react"
import {
	CircularProgress,
	TextField,
	InputAdornment,
	Checkbox,
	FormControlLabel,
	Button,
	Drawer,
	IconButton,
	Select,
	MenuItem,
	Chip,
	Badge
} from "@mui/material"
import {
	Search,
	FilterList,
	ExpandMore,
	Close
} from "@mui/icons-material"
import { productQueries } from "~entities/product"
import ProductCard from "./../../entities/product/ui/Card"

type Category = {
	id: number
	name: string
	children: { id: number; name: string }[]
}

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc"

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
	{ value: "default", label: "По умолчанию" },
	{ value: "price-asc", label: "Сначала дешёвые" },
	{ value: "price-desc", label: "Сначала дорогие" },
	{ value: "name-asc", label: "По названию (А-Я)" }
]

const toPrice = (value: string) => {
	const parsed = parseFloat(value)
	return Number.isFinite(parsed) ? parsed : 0
}

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

	const [selectedCategories, setSelectedCategories] = useState<number[]>([])
	const [openDropdown, setOpenDropdown] = useState<number | null>(null)
	const [searchQuery, setSearchQuery] = useState("")
	const [debouncedSearch, setDebouncedSearch] = useState("")
	const [minPrice, setMinPrice] = useState("")
	const [maxPrice, setMaxPrice] = useState("")
	const [sortBy, setSortBy] = useState<SortOption>("default")
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	// Debounce the search input so typing stays smooth on large lists.
	useEffect(() => {
		const timer = setTimeout(() => setDebouncedSearch(searchQuery), 250)
		return () => clearTimeout(timer)
	}, [searchQuery])

	const categories: Category[] = categoriesData?.data ?? []
	const products = productData?.data?.results ?? []

	// Flat lookup of every category id -> name (incl. children) for chips.
	const categoryNameById = useMemo(() => {
		const map = new Map<number, string>()
		categories.forEach((category) => {
			map.set(category.id, category.name)
			category.children.forEach((child) => map.set(child.id, child.name))
		})
		return map
	}, [categories])

	const filteredProducts = useMemo(() => {
		const query = debouncedSearch.trim().toLowerCase()
		const min = minPrice === "" ? null : toPrice(minPrice)
		const max = maxPrice === "" ? null : toPrice(maxPrice)

		const result = products.filter((product) => {
			const matchesSearch =
				query === "" ||
				product.name.toLowerCase().includes(query) ||
				(product.description ?? "").toLowerCase().includes(query)

			const productCategoryIds = product.category.map((cat) => cat.id)
			const matchesCategory =
				selectedCategories.length === 0 ||
				productCategoryIds.some((id) => selectedCategories.includes(id))

			const price = toPrice(product.price)
			const matchesMin = min === null || price >= min
			const matchesMax = max === null || price <= max

			return matchesSearch && matchesCategory && matchesMin && matchesMax
		})

		const sorted = [...result]
		switch (sortBy) {
			case "price-asc":
				sorted.sort((a, b) => toPrice(a.price) - toPrice(b.price))
				break
			case "price-desc":
				sorted.sort((a, b) => toPrice(b.price) - toPrice(a.price))
				break
			case "name-asc":
				sorted.sort((a, b) => a.name.localeCompare(b.name, "ru"))
				break
			default:
				break
		}
		return sorted
	}, [products, debouncedSearch, selectedCategories, minPrice, maxPrice, sortBy])

	const activeFilterCount =
		selectedCategories.length +
		(minPrice !== "" ? 1 : 0) +
		(maxPrice !== "" ? 1 : 0)

	const hasAnyFilter =
		activeFilterCount > 0 || searchQuery !== "" || sortBy !== "default"

	if (isLoading || isCategoryLoading) {
		return (
			<div className="flex flex-col items-center gap-4 py-20">
				<CircularProgress className="text-milk w-10 h-10" />
				<h3 className="text-milk font-semibold text-lg opacity-75">
					Загружаем данные...
				</h3>
			</div>
		)
	}

	if (isError || isCategoryError) {
		return (
			<div className="flex flex-col items-center gap-4 py-20">
				<h3 className="text-milk font-semibold text-lg opacity-75">
					Произошла ошибка при загрузке данных!
				</h3>
			</div>
		)
	}

	const getParentState = (category: Category) => {
		const allIds = [category.id, ...category.children.map((c) => c.id)]
		const selectedCount = allIds.filter((id) =>
			selectedCategories.includes(id)
		).length
		return {
			checked: selectedCount === allIds.length,
			indeterminate: selectedCount > 0 && selectedCount < allIds.length
		}
	}

	const handleParentToggle = (category: Category) => {
		const allIds = [category.id, ...category.children.map((c) => c.id)]
		const isFullySelected = allIds.every((id) =>
			selectedCategories.includes(id)
		)
		setSelectedCategories((prev) => {
			const set = new Set(prev)
			if (isFullySelected) {
				allIds.forEach((id) => set.delete(id))
			} else {
				allIds.forEach((id) => set.add(id))
			}
			return [...set]
		})
	}

	const handleChildToggle = (childId: number) => {
		setSelectedCategories((prev) =>
			prev.includes(childId)
				? prev.filter((id) => id !== childId)
				: [...prev, childId]
		)
	}

	const removeCategory = (id: number) => {
		setSelectedCategories((prev) => prev.filter((catId) => catId !== id))
	}

	const resetFilters = () => {
		setSelectedCategories([])
		setSearchQuery("")
		setMinPrice("")
		setMaxPrice("")
		setSortBy("default")
		setOpenDropdown(null)
	}

	const renderFilterTree = () =>
		categories.map((category) => {
			const parentState = getParentState(category)
			const isOpen = openDropdown === category.id
			return (
				<div
					key={category.id}
					className="border-b border-gray-100 last:border-0"
				>
					<div className="flex items-center justify-between">
						<FormControlLabel
							control={
								<Checkbox
									size="small"
									checked={parentState.checked}
									indeterminate={parentState.indeterminate}
									onChange={() => handleParentToggle(category)}
									sx={{
										color: "#1A1A1A",
										"&.Mui-checked": { color: "#1A1A1A" },
										"&.MuiCheckbox-indeterminate": { color: "#1A1A1A" }
									}}
								/>
							}
							label={category.name}
						/>
						{category.children.length > 0 && (
							<IconButton
								size="small"
								onClick={() =>
									setOpenDropdown(isOpen ? null : category.id)
								}
								aria-label="Раскрыть подкатегории"
							>
								<ExpandMore
									fontSize="small"
									className={`transition-transform ${
										isOpen ? "rotate-180" : ""
									}`}
								/>
							</IconButton>
						)}
					</div>
					{isOpen && category.children.length > 0 && (
						<div className="flex flex-col pl-6 pb-2">
							{category.children.map((child) => (
								<FormControlLabel
									key={child.id}
									control={
										<Checkbox
											size="small"
											checked={selectedCategories.includes(child.id)}
											onChange={() => handleChildToggle(child.id)}
											sx={{
												color: "#1A1A1A",
												"&.Mui-checked": { color: "#1A1A1A" }
											}}
										/>
									}
									label={child.name}
								/>
							))}
						</div>
					)}
				</div>
			)
		})

	const sortControl = (
		<Select
			value={sortBy}
			onChange={(e) => setSortBy(e.target.value as SortOption)}
			size="small"
			className="min-w-[180px] w-full sm:w-auto bg-white"
		>
			{SORT_OPTIONS.map((option) => (
				<MenuItem
					key={option.value}
					value={option.value}
				>
					{option.label}
				</MenuItem>
			))}
		</Select>
	)

	const priceControl = (
		<div className="mt-6">
			<h4 className="font-semibold text-sm mb-2 text-black">Цена, сом</h4>
			<div className="flex items-center gap-2">
				<TextField
					type="number"
					size="small"
					placeholder="от"
					value={minPrice}
					onChange={(e) => setMinPrice(e.target.value)}
					inputProps={{ min: 0 }}
					fullWidth
				/>
				<span className="text-gray-400">—</span>
				<TextField
					type="number"
					size="small"
					placeholder="до"
					value={maxPrice}
					onChange={(e) => setMaxPrice(e.target.value)}
					inputProps={{ min: 0 }}
					fullWidth
				/>
			</div>
		</div>
	)

	const resetButton = (
		<Button
			fullWidth
			variant="outlined"
			onClick={resetFilters}
			disabled={!hasAnyFilter}
			sx={{
				marginTop: "24px",
				borderRadius: 0,
				borderColor: "#1A1A1A",
				color: "#1A1A1A",
				letterSpacing: "0.15em",
				textTransform: "uppercase",
				fontSize: "11px",
				"&:hover": { borderColor: "#1A1A1A", background: "#f5f5f5" }
			}}
		>
			Сбросить фильтры
		</Button>
	)

	return (
		<div className="min-h-screen w-full px-4 py-6 md:p-10">
			<h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-black text-center mb-6 md:mb-8 tracking-tight">
				Каталог Косметики
			</h2>

			<div className="flex items-center gap-2 mb-4">
				<TextField
					fullWidth
					variant="outlined"
					placeholder="Поиск по названию или описанию..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						),
						endAdornment: searchQuery && (
							<InputAdornment position="end">
								<IconButton
									size="small"
									onClick={() => setSearchQuery("")}
									aria-label="Очистить поиск"
								>
									<Close fontSize="small" />
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
				<div className="hidden md:block">{sortControl}</div>
				<IconButton
					className="md:hidden"
					onClick={() => setIsFilterOpen(true)}
					aria-label="Открыть фильтры"
				>
					<Badge
						badgeContent={activeFilterCount}
						color="primary"
					>
						<FilterList />
					</Badge>
				</IconButton>
			</div>

			{/* Mobile sort + active filter chips */}
			<div className="flex flex-wrap items-center gap-2 mb-4">
				<div className="md:hidden w-full sm:w-auto">{sortControl}</div>
				{selectedCategories.map((id) => (
					<Chip
						key={id}
						label={categoryNameById.get(id) ?? `#${id}`}
						onDelete={() => removeCategory(id)}
						size="small"
						sx={{ background: "#1A1A1A", color: "white" }}
						deleteIcon={<Close sx={{ color: "white !important" }} />}
					/>
				))}
				{minPrice !== "" && (
					<Chip
						label={`от ${minPrice} сом`}
						onDelete={() => setMinPrice("")}
						size="small"
						variant="outlined"
					/>
				)}
				{maxPrice !== "" && (
					<Chip
						label={`до ${maxPrice} сом`}
						onDelete={() => setMaxPrice("")}
						size="small"
						variant="outlined"
					/>
				)}
			</div>

			<Drawer
				anchor="left"
				open={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				// Render inside #root so Tailwind's `important: "#root"` utilities apply.
				ModalProps={{ disablePortal: true }}
			>
				<div className="flex flex-col h-full w-[85vw] max-w-[340px]">
					<div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
						<h3 className="font-bold text-lg tracking-wide uppercase">Фильтр</h3>
						<IconButton
							onClick={() => setIsFilterOpen(false)}
							aria-label="Закрыть фильтр"
						>
							<Close />
						</IconButton>
					</div>
					<div className="flex-1 overflow-y-auto px-5 py-4">
						{renderFilterTree()}
						{priceControl}
						{resetButton}
					</div>
					<div className="px-5 py-4 border-t border-gray-200">
						<Button
							fullWidth
							variant="contained"
							onClick={() => setIsFilterOpen(false)}
							sx={{
								borderRadius: 0,
								background: "#1A1A1A",
								boxShadow: "none",
								letterSpacing: "0.15em",
								textTransform: "uppercase",
								fontSize: "11px",
								paddingY: "12px",
								"&:hover": { background: "#333" }
							}}
						>
							Показать ({filteredProducts.length})
						</Button>
					</div>
				</div>
			</Drawer>

			<div className="flex flex-col md:flex-row md:justify-between gap-6 lg:gap-[50px] mt-6 items-start">
				<div className="hidden md:block w-64 p-6 bg-white border border-gray-100 flex-grow-0 sticky top-6 max-h-[calc(100vh-3rem)] overflow-auto">
					<h3 className="font-bold text-lg mb-2">Фильтр</h3>
					{renderFilterTree()}
					{priceControl}
					{resetButton}
				</div>

				<div className="flex-1 w-full">
					<p className="text-sm text-gray-500 mb-4">
						Найдено товаров: {filteredProducts.length}
					</p>
					{filteredProducts.length > 0 ? (
						<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
							{filteredProducts.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center gap-3 py-16 text-center w-full">
							<p className="text-gray-500">
								Нет товаров, соответствующих фильтрам.
							</p>
							{hasAnyFilter && (
								<Button
									variant="text"
									onClick={resetFilters}
									sx={{ color: "#1A1A1A", textTransform: "none" }}
								>
									Сбросить фильтры
								</Button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
