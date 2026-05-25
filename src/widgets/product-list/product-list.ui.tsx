import { productQueries } from '~entities/product';
import { CircularProgress } from '@mui/material';
import ProductCard from './../../entities/product/ui/Card';
import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

export const ProductList = () => {
  const {
    data: productData,
    isLoading,
    isError,
  } = productQueries.useGetProducts();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CircularProgress className="text-milk w-10 h-10" />
        <h3 className="text-milk font-semibold text-lg opacity-75">
          Загружаем данные...
        </h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-milk font-semibold text-lg opacity-75">
          Произошла ошибка при загрузке данных!
        </h3>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 flex flex-col">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {productData.data.results.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link
        to={pathKeys.catalog()}
        className="underline text-violet font-semibold text-end mt-4"
      >
        В Каталог
      </Link>
    </div>
  );
};
