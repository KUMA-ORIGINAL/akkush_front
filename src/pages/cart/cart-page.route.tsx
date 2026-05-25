import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { CartPage } from './cart-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const cartPageRoute: RouteObject = {
  path: pathKeys.cart(),
  element: createElement(CartPage),
};
