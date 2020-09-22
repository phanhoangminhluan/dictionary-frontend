/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import indexRoutes from 'containers/Router';
import { renderRoutes } from 'components/router';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../Authen/Login/reducer';
import {key} from '../Authen/Login/constants';
import './styles.css';

export default function App() {
  useInjectReducer({ key, reducer });

  return (
    <div className="content-page">
      { renderRoutes(indexRoutes, "") }
    </div>
  );
}
