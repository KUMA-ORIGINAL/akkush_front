export const pathKeys = {
	root: "/",
	home() {
		return pathKeys.root
	},
	profile() {
		return pathKeys.root.concat("profile/")
	},
	favorite() {
		return pathKeys.root.concat("favorites/")
	},
	about() {
		return pathKeys.root.concat("about/")
	},
	cart() {
		return pathKeys.root.concat("cart/")
	},
	order() {
		return pathKeys.root.concat("order/")
	},
	terms() {
		return pathKeys.root.concat("terms-of-use/")
	},
	policy() {
		return pathKeys.root.concat("privacy-policy/")
	},
	login() {
		return pathKeys.root.concat("login/")
	},
	program() {
		return pathKeys.root.concat("course/")
	},
	loyalty() {
		return pathKeys.root.concat("loyalty/")
	},
	forgotPassword() {
		return pathKeys.root.concat("forgot-password/")
	},
	catalog() {
		return pathKeys.root.concat("catalog/")
	},
	product(productId: number | string) {
		return pathKeys.root.concat(`products/${productId}/`)
	},
	hit(hitId: number | string) {
		return pathKeys.root.concat(`hits/${hitId}/`)
	},
	register() {
		return pathKeys.root.concat("register/")
	}
}
