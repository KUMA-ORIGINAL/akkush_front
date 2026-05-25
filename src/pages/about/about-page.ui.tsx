import { Title } from "~shared/ui/title"
import { Sparkles, Feather, ShieldCheck } from "lucide-react"

export function AboutPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
			<div className="container mx-auto px-4 py-16">
				<div className="max-w-5xl mx-auto">
					{/* Hero */}
					<div className="text-center">
						<div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-200">
							<Feather className="w-4 h-4 text-gray-700" />
							<span className="text-sm text-gray-600 tracking-wide uppercase">
								Premium Beauty Concept
							</span>
						</div>

						<Title className="mt-6 text-center text-4xl md:text-5xl font-bold text-gray-900">
							О нас
						</Title>

						<p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
							«Ак Куш» — концепция премиального интернет-магазина декоративной
							косметики, вдохновленная естественной красотой, легкостью и
							элегантностью.
						</p>
					</div>

					{/* Main content */}
					<div className="mt-14 grid gap-8 lg:grid-cols-2">
						<div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
							<div className="flex items-center gap-3 mb-5">
								<div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100">
									<Sparkles className="w-6 h-6 text-gray-700" />
								</div>

								<h2 className="text-2xl font-semibold text-gray-900">
									Философия бренда
								</h2>
							</div>

							<div className="space-y-5 text-gray-700 leading-8">
								<p>
									Название «Ак Куш» родилось из кыргызского языка и переводится
									как «Белая птица». Нашим символом стал белый лебедь —
									олицетворение чистоты, грации и естественной красоты.
								</p>

								<p>
									Лебедь не пытается быть кем-то другим — её замечают за её
									естественную легкость и утонченность. Именно так, по нашему
									убеждению, должна работать люксовая косметика: не перегружать
									и не маскировать, а превращать естественность в искусство.
								</p>

								<p>
									Красота — это язык, и у каждой он свой. Иногда это смелый
									акцент, который говорит о характере. Иногда едва заметный
									нюанс, отражающий настроение дня.
								</p>
							</div>
						</div>

						<div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
							<div className="flex items-center gap-3 mb-5">
								<div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100">
									<ShieldCheck className="w-6 h-6 text-gray-700" />
								</div>

								<h2 className="text-2xl font-semibold text-gray-900">
									Наш подход
								</h2>
							</div>

							<div className="space-y-5 text-gray-700 leading-8">
								<p>
									Косметика не меняет вас — она помогает быть увиденной именно
									такой, какой вы себя чувствуете.
								</p>

								<p>
									В нашем магазине только оригинальная люксовая косметика, в
									качестве которой мы уверены. Вы заслуживаете настоящего, не
									иначе.
								</p>

								<p>
									Мы работаем как для тех, кто создает макияж для себя, так и
									для профессиональных визажистов. В нашем каталоге найдут себя
									девушки любого возраста и мастера, для которых качество и
									оригинальность продукта — необходимость.
								</p>

								<p className="font-medium text-gray-900">
									Будьте собой — мы просто помогаем это сделать красиво.
								</p>
							</div>
						</div>
					</div>

					{/* Footer note */}
					<div className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 p-6">
						<p className="text-sm md:text-base text-amber-900 leading-7">
							<strong>Важно:</strong> «Ак Куш» — учебный дипломный проект. Вся
							информация о товарах, брендах и ценах носит демонстрационный
							характер. Проект не связан с реальными коммерческими
							предприятиями, имеющими аналогичное название.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}