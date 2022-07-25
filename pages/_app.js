import "../styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import Header from "../components/Header"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

// now using graphql for api calls to graphprotocol
const client = new ApolloClient({
  cache: new InMemoryCache(), // to help when we refresh pages
  uri: "https://api.studio.thegraph.com/query/31490/nftmarketplace/v.0.0.2"
  // ^ link to our decentralized database
  // ^ the https is a gateway call it doesn't mean our db is centralized
})

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="An NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider>
            <Header />
            <Component {...pageProps} />
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </div>
  ) 
}

export default MyApp
