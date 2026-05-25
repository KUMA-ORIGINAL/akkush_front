import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { OrderPage } from './order-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const orderPageRoute: RouteObject = {
  path: pathKeys.order(),
  element: createElement(OrderPage),
};
