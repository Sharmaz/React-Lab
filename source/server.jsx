import http from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';


import Layout from './pages/components/Layout';
import messages from './messages.json';
import store from './store';

const domain = process.env.NODE_ENV === 'production'
  ? 'https://react-lab-sfs.now.sh'
  : 'http://localhost:3001';

function requestHandler(request, response) {
  const locale = request.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
  const context = {};

  const html = ReactDOMServer.renderToStaticMarkup(
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <StaticRouter location={request.url} context={context}>
          <Layout title="Aplicación" domain={domain} />
        </StaticRouter>
      </IntlProvider>
    </Provider>,
  );

  response.setHeader('Content-Type', 'text/html');

  if (context.url) {
    response.writeHead(301, {
      Location: context.url,
    });
    response.end();
  } else {
    response.write(html);
    response.end();
  }
}

const server = http.createServer(requestHandler);
server.listen(3000);
