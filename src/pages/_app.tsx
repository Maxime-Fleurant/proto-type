import { CacheProvider } from '@emotion/core';
import { Provider } from 'react-redux';
import { cache } from 'emotion';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/tailwindBase.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloclient';
import Layout from '../component/Layout';
import store from '../lib/store';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <CacheProvider value={cache}>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ApolloProvider>
    </CacheProvider>
  );
}

export default MyApp;
