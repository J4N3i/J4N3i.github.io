import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';

export function render() {
  return ReactDOMServer.renderToString(
    <StaticRouter location="/">
      <AppRoutes />
    </StaticRouter>
  );
}
