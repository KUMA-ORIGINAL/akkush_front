import { useEffect, useMemo, useState } from "react"
import { CircularProgress } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import { productQueries } from "~entities/product"
import { CartButton } from "~features/product-card/cart-button"
import { FavoriteButton } from "~features/product-card/favorite-button"
import { pathKeys } from "~shared/lib/react-router"

type ProductRecord = Record<string, unknown> & {
	id: number
	name?: string
	price?: number | string
	photo?: string
	photos?: ProductPhoto[]
	description?: string
	category?: unknown
}

type ProductPhoto = {
	id?: number
	photo?: string | null
	order?: number
}

type GalleryImage = {
	id: string
	src: string
}

const hiddenDetails = new Set([
	"id",
	"name",
	"price",
	"photo",
	"photos",
	"description",
	"category",
	"quantity",
	"article",
	"articul",
	"sku",
	"code",
	"vendorCode"
])

function normalizeProductImage(photo: unknown) {
	if (typeof photo !== "string" || !photo) {
		return null
	}

	if (photo.startsWith("http")) {
		return photo
	}

	return `https://asiya.tw1.su/${photo.replace(/^\/+/, "")}`
}

function getProductGallery(product?: ProductRecord): GalleryImage[] {
	const images: GalleryImage[] = []
	const usedSources = new Set<string>()

	const addImage = (photo: unknown, id: string) => {
		const src = normalizeProductImage(photo)

		if (!src || usedSources.has(src)) {
			return
		}

		usedSources.add(src)
		images.push({ id, src })
	}

	addImage(product?.photo, "main")

	const extraPhotos = Array.isArray(product?.photos) ? [...product.photos] : []
	extraPhotos
		.sort(
			(firstPhoto, secondPhoto) =>
				(firstPhoto.order ?? 0) - (secondPhoto.order ?? 0)
		)
		.forEach((photo, index) => {
			addImage(photo.photo, `extra-${photo.id ?? index}`)
		})

	return images.length > 0 ? images : [{ id: "fallback", src: "/mockup.png" }]
}

function getCategoryNames(category: unknown) {
	if (Array.isArray(category)) {
		return category
			.map((item) =>
				typeof item === "object" && item !== null && "name" in item
					? String(item.name)
					: String(item)
			)
			.filter(Boolean)
	}

	if (typeof category === "object" && category !== null && "name" in category) {
		return [String(category.name)]
	}

	if (typeof category === "string") {
		return [category]
	}

	return []
}

function formatDetailValue(value: unknown): string {
	if (typeof value === "boolean") {
		return value ? "Да" : "Нет"
	}

	if (Array.isArray(value)) {
		return value.map(formatDetailValue).join(", ")
	}

	if (typeof value === "object" && value !== null) {
		return Object.entries(value)
			.map(([key, itemValue]) => `${key}: ${formatDetailValue(itemValue)}`)
			.join(", ")
	}

	return String(value)
}

function formatDetailName(name: string) {
	return name
		.replace(/_/g, " ")
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/^./, (letter) => letter.toUpperCase())
}

function getProductArticle(product: ProductRecord) {
	const article =
		product.article ||
		product.articul ||
		product.sku ||
		product.code ||
		product.vendorCode

	return article ? String(article) : null
}

export function ProductDetailPage() {
	const { productId } = useParams()
	const numericProductId = Number(productId)
	const hasValidProductId = Number.isFinite(numericProductId)

	const {
		data: productData,
		isLoading,
		isError
	} = productQueries.useGetProduct(numericProductId)
	const product = productData?.data as ProductRecord | undefined
	const galleryImages = useMemo(() => getProductGallery(product), [product])
	const [selectedPhoto, setSelectedPhoto] = useState(galleryImages[0].src)

	useEffect(() => {
		setSelectedPhoto(galleryImages[0].src)
	}, [galleryImages])

	if (!hasValidProductId) {
		return (
			<div className="min-h-[50vh] px-4 py-10 text-center">
				<p className="mb-6 font-serif   text-xl text-gray-500">
					Товар не найден.
				</p>
				<Link
					to={pathKeys.catalog()}
					className="inline-block bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white no-underline transition-colors hover:bg-gray-800"
				>
					В каталог
				</Link>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
				<CircularProgress className="text-black" />
				<p className="font-serif   text-lg text-gray-500">Загружаем товар...</p>
			</div>
		)
	}

	if (isError || !productData?.data) {
		return (
			<div className="min-h-[50vh] px-4 py-10 text-center">
				<p className="mb-6 font-serif   text-xl text-gray-500">
					Не удалось загрузить товар.
				</p>
				<Link
					to={pathKeys.catalog()}
					className="inline-block bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white no-underline transition-colors hover:bg-gray-800"
				>
					В каталог
				</Link>
			</div>
		)
	}

	const productDetails = product as ProductRecord
	const categoryNames = getCategoryNames(productDetails.category)
	const price = Number(productDetails.price)
	const displayPrice = Number.isFinite(price)
		? Math.floor(price)
		: productDetails.price
	const productArticle = getProductArticle(productDetails)
	const breadcrumbCategories = categoryNames.slice(0, 2)
	const additionalDetails = Object.entries(productDetails).filter(
		([key, value]) => {
			if (
				hiddenDetails.has(key) ||
				value === null ||
				value === undefined ||
				value === ""
			) {
				return false
			}

			return !(Array.isArray(value) && value.length === 0)
		}
	)

	return (
		<section className="w-full px-4 pb-14 md:px-0">
			<nav className="mb-7 rounded bg-gray-100 px-4 py-3 text-sm leading-6 text-gray-600">
				<Link
					to={pathKeys.home()}
					className="text-gray-700 underline-offset-4 hover:underline"
				>
					Главная
				</Link>
				<span className="px-2">/</span>
				<Link
					to={pathKeys.catalog()}
					className="text-gray-700 underline-offset-4 hover:underline"
				>
					Каталог
				</Link>
				{breadcrumbCategories.map((category) => (
					<span key={category}>
						<span className="px-2">/</span>
						<span>{category}</span>
					</span>
				))}
				<span className="px-2">/</span>
				<span>{productDetails.name || "Товар"}</span>
			</nav>
			<Link
				to={pathKeys.catalog()}
				className="hidden"
			>
				Назад в каталог
			</Link>

			<div className="grid gap-8 md:grid-cols-[420px_minmax(0,1fr)] lg:grid-cols-[480px_minmax(0,1fr)] md:items-start">
				<div className="flex flex-col items-center md:items-start">
					<img
						src={selectedPhoto}
						alt={productDetails.name || "Товар"}
						className="max-h-[520px] w-full max-w-[420px] rounded-md object-contain md:max-w-[460px]"
						onError={(event) => {
							event.currentTarget.src = "/mockup.png"
						}}
					/>
					{galleryImages.length > 1 && (
						<div className="mt-4 flex max-w-[460px] flex-wrap justify-center gap-2 md:justify-start">
							{galleryImages.map((image) => (
								<button
									key={image.id}
									type="button"
									onClick={() => setSelectedPhoto(image.src)}
									className={`h-16 w-16 overflow-hidden rounded-md bg-white transition ${
										selectedPhoto === image.src
											? "ring-2 ring-milk ring-offset-2"
											: "opacity-70 hover:opacity-100"
									}`}
								>
									<img
										src={image.src}
										alt={productDetails.name || "Товар"}
										className="h-full w-full object-cover"
										onError={(event) => {
											event.currentTarget.src = "/mockup.png"
										}}
									/>
								</button>
							))}
						</div>
					)}
					<Link
						to={pathKeys.catalog()}
						className="mt-7 inline-block text-sm font-semibold text-black underline underline-offset-4"
					>
						Вернуться назад
					</Link>
				</div>

				<div className="flex flex-col gap-6">
					<div>
						<h1 className="font-play text-3xl font-normal leading-tight text-milk md:text-4xl">
							{productDetails.name || "Товар"}
						</h1>
						<div className="mt-5 grid max-w-[440px] grid-cols-[auto_1fr] gap-x-10 gap-y-2 text-lg font-semibold uppercase text-black">
							<span>Цена:</span>
							<span className="flex items-center gap-2">
								{displayPrice}
								<img
									src="/som.png"
									alt="currency"
									className="h-5 w-5 opacity-70"
								/>
							</span>
							{productArticle && (
								<>
									<span>Артикул товара:</span>
									<span>{productArticle}</span>
								</>
							)}
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<CartButton
							product={productDetails}
							variant="detail"
						/>
						<FavoriteButton id={productDetails.id} />
					</div>

					{categoryNames.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{categoryNames.map((category) => (
								<span
									key={category}
									className="bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-600"
								>
									{category}
								</span>
							))}
						</div>
					)}

					<div className="border-t border-gray-200 pt-5">
						<h2 className="hidden">Описание</h2>
						<p className="whitespace-pre-line text-base leading-7 text-gray-700">
							{productDetails.description || "Описание товара скоро появится."}
						</p>
					</div>
				</div>
			</div>

			{additionalDetails.length > 0 && (
				<div className="mt-10 border-t border-gray-100 pt-8">
					<h2 className="mb-4 font-serif text-2xl font-semibold   text-black">
						Характеристики
					</h2>
					<dl className="grid gap-4 sm:grid-cols-2">
						{additionalDetails.map(([key, value]) => (
							<div
								key={key}
								className="border border-gray-100 bg-white p-4"
							>
								<dt className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
									{formatDetailName(key)}
								</dt>
								<dd className="text-sm leading-6 text-gray-700">
									{formatDetailValue(value)}
								</dd>
							</div>
						))}
					</dl>
				</div>
			)}
		</section>
	)
}
