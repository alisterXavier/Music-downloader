import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { createContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: " /api/graphql",
  cache: new InMemoryCache(),
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></Script>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
