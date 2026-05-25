import {
  createOrder,
  createPayment,
  getAdsProducts,
  getCartInfo,
  getCategories,
  getProduct,
  getFavoriteProduct,
  getFavorites,
  getHit,
  getHits,
  getProducts,
  getReccommndedProducts,
} from './product.api';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const keys = {
  root: () => ['product'],
  category: () => ['category'],
  cart: () => ['cart'],
  createOrder: () => [...keys.root(), 'create'] as const,
  getCart: () => [...keys.root(), 'cart-info'] as const,
  getProduct: (id: number) => [...keys.root(), 'product', id] as const,
  getProducts: () => [...keys.root(), 'products'] as const,
  getAdProducts: () => [...keys.root(), 'ad-products'] as const,
  getHits: () => [...keys.root(), 'hits'] as const,
  getHit: (id: number) => [...keys.root(), 'hit', id] as const,
  getFavoriteProducts: () => [...keys.root(), 'fav'] as const,
  getCategories: () => [...keys.category(), 'categories'] as const,
  favProduct: (id: number) => [...keys.root(), 'favorite', id] as const,
  getReccommndedProducts: () =>
    [...keys.root(), 'recommended'] as const,
};

export function useGetProducts() {
  return useQuery({
    queryKey: keys.getProducts(),
    queryFn: getProducts,
  });
}

export function useGetProduct(id: number) {
  return useQuery({
    queryKey: keys.getProduct(id),
    queryFn: () => getProduct(id),
    enabled: Number.isFinite(id),
  });
}

export function useGetAdProducts() {
  return useQuery({
    queryKey: keys.getAdProducts(),
    queryFn: getAdsProducts,
  });
}

export function useGetHits() {
  return useQuery({
    queryKey: keys.getHits(),
    queryFn: getHits,
  });
}

export function useGetHit(id: number) {
  return useQuery({
    queryKey: keys.getHit(id),
    queryFn: () => getHit(id),
    enabled: Number.isFinite(id),
  });
}

export function useFavoriteProduct(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: keys.favProduct(id),
    mutationFn: () => getFavoriteProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.favProduct(id) });
      await queryClient.invalidateQueries({ queryKey: keys.root() });
    },
  });
}

export function useGetFavoriteProducts() {
  return useQuery({
    queryKey: keys.getFavoriteProducts(),
    queryFn: getFavorites,
  });
}

export function useGetCategories() {
  return useQuery({
    queryKey: keys.getCategories(),
    queryFn: getCategories,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keys.createOrder(),
    mutationFn: createOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.cart() });
    },
  });
}

export function useGetCart() {
  return useQuery({
    queryKey: keys.getCart(),
    queryFn: getCartInfo,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keys.createOrder(),
    mutationFn: createPayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.cart() });
    },
  });
}


export function useGetReccommndedProducts() {
  return useQuery({
    queryKey: keys.getReccommndedProducts(),
    queryFn: getReccommndedProducts
  });
}
