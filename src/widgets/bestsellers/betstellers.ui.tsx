import { CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
import { productQueries } from "~entities/product"
import { pathKeys } from "~shared/lib/react-router"

type Hit = {
	id: number
	text: string
	photo: string | null
	order: number
}

function getHitImage(photo: string | null) {
	return photo || "/mockup.png"
}

export const Bestsellers = () => {
	const { data: hitsData, isLoading, isError } = productQueries.useGetHits()

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center gap-5 py-20">
				<CircularProgress
					size={34}
					sx={{ color: "black" }}
				/>

				<p className="text-sm uppercase tracking-[0.25em] text-gray-400">
					Загружаем хиты продаж
				</p>
			</div>
		)
	}

	if (isError) {
		return null
	}

	const hits = (hitsData?.data || []) as Hit[]

	if (hits.length === 0) {
		return null
	}

	return (
		<section className="relative overflow-hidden  py-20 px-4 md:px-8">
			<div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white blur-3xl opacity-70" />
			<div className="absolute right-0 bottom-0 h-80 w-80 rounded-full " />

			<div className="relative mx-auto max-w-7xl">
				<div className="mb-12 text-center">
					<p className="mb-4 text-xs uppercase tracking-[0.35em] text-gray-400">
						Ak Kush Selection
					</p>

					<h2 className="font-serif text-4xl md:text-5xl text-black tracking-tight">
						Хиты продаж
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-gray-500 leading-7">
						Самые любимые позиции, которые чаще всего выбирают наши покупатели.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{hits.map((hit, index) => (
						<div
							key={hit.id}
							className="group relative overflow-hidden rounded-[32px] bg-white shadow-sm border border-white/70 no-underline transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl "
						>
							<div className="relative overflow-hidden">
								<img
									src={getHitImage(hit.photo)}
									alt={hit.text}
									className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
									onError={(event) => {
										event.currentTarget.src = "/mockup.png"
									}}
								/>

								<div className="absolute inset-0 " />

								<div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-black backdrop-blur">
									#{index + 1}
								</div>
							</div>

							<div className="absolute inset-x-0 bottom-0 p-6">
								<div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
									<h3 className="font-serif text-2xl text-white leading-tight">
										{hit.text}
									</h3>

									
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
