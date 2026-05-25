import React from "react"
import { productQueries } from "~entities/product"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { Pagination, EffectFade, Autoplay } from "swiper/modules"
import { CircularProgress } from "@mui/material"

export const AdProducts = () => {
	const {
		data: AdProductsData,
		isLoading,
		isError
	} = productQueries.useGetAdProducts()

	if (isLoading) {
		return (
			<div className="flex flex-col items-center gap-4">
				<CircularProgress className="text-milk w-10 h-10" />
				<h3 className="text-milk font-semibold text-lg opacity-75">
					Загружаем данные...
				</h3>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center gap-4">
				<h3 className="text-milk font-semibold text-lg opacity-75">
					Произошла ошибка при загрузке данных!
				</h3>
			</div>
		)
	}

	return (
		<div className="slider-banner w-full md:max-w-7xl px-4">
			<Swiper
				modules={[Pagination, EffectFade, Autoplay]}
				pagination={{ clickable: true }}
				effect="fade"
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				loop={true}
				className="h-[30rem] md:h-[26rem] sm:h-[22rem] rounded-xl shadow-sm"
			>
				{AdProductsData.data.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="relative w-full h-full ">
							<img
								src={slide.photo}
								alt={slide.title}
								className="w-full h-full object-cover rounded-lg "
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end items-center text-white px-8 pb-12 text-center transition-all">
								<h2 className="text-4xl md:text-5xl sm:text-3xl font-serif italic mb-3 transform transition-transform hover:scale-105 duration-700 text-shadow-md">
									{slide.title}
								</h2>
								<p className="text-lg md:text-base sm:text-sm font-light tracking-wide max-w-2xl opacity-90">
									{slide.description}
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
