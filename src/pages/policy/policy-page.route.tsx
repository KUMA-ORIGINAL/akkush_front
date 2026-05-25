import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { PolicyPage} from './policy-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const policyPageRoute: RouteObject = {
  path: pathKeys.policy(),
  element: createElement(PolicyPage),
};
