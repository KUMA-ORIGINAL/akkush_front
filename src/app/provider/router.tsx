import {
  Link,
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { homePageRoute } from '../../pages/home';
import { profilePageRoute } from '../../pages/profile';
import { catalogPageRoute } from '../../pages/catalog/catalog-page.route';
import { GenericLayout } from '../../pages/layout';
import { aboutPageRoute } from '~pages/about';
import { loginPageRoute } from '~pages/login';
import { registerPageRoute } from '~pages/register';
import { verifyPageRoute } from '~pages/verify';
import { favoritePageRoute } from '~pages/favorite';
import { termsPageRoute } from '~pages/terms';
import { policyPageRoute } from '~pages/policy';
import { cartPageRoute } from './../../pages/cart/cart-page.route';
import { orderPageRoute } from '~pages/order';
import { productDetailPageRoute } from '~pages/product-detail';

function BubbleError() {
  const error = useRouteError();

  if (error instanceof Error) {
    console.error('Route Error:', error.message);
  } else {
    console.error('Unknown Route Error:', error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl mb-4 text-gray-700">
          Ой, кажется, такая страница не найдена.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Возможно, ссылка устарела или была удалена.
        </p>
        <Link
          className="inline-block py-3 px-8 text-white bg-violet rounded-lg hover:bg-blue-700 transition duration-300"
          to="/"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default BubbleError;


const router = createBrowserRouter([
  {
    path: '/',
    element: <GenericLayout />,
    errorElement: <BubbleError />,
    children: [
      homePageRoute,
      profilePageRoute,
      catalogPageRoute,
      aboutPageRoute,
      aboutPageRoute,
      policyPageRoute,
      loginPageRoute,
      verifyPageRoute,
      termsPageRoute,
      registerPageRoute,
      favoritePageRoute,
      cartPageRoute,
      productDetailPageRoute,
      orderPageRoute,
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
