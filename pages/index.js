import Image from "next/image"
import { useMoralisQuery, useMoralis } from "react-moralis"
import { useQuery, gql } from "@apollo/client"
import NFTBox from "../components/NFTBox"
import styles from "../styles/Home.module.css"
import networkMapping from "../constants/networkmapping.json"
import GET_ACTIVE_ITEMS from "../constants/subGraphQueries"

export default function Home() 
{
  const { chainId, isWeb3Enabled } = useMoralis() // will return 0x231..
  const chainIdString = chainId ? parseInt(chainId).toString() : "31337"
  // console.log(chainIdString)
  const marketplaceAddress = networkMapping[chainIdString]["NFTMarketplace"][0]

  // now using graphql for queries
  const { loading, error, data: listedNFTs } = useQuery(GET_ACTIVE_ITEMS)
  // ^ making queries with graphql may be cumbersome to type here so 
  // we'll get our queries from another file

  // console.log(listedNFTs)

  return (
    <div className="container mx-auto">
      <h1 className="p-4 font-bold text-2xl">Recent Listings</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? 
          loading || !listedNFTs ? (<div>Loading...</div>) : listedNFTs.activeItems.map((NFT, index)=>
          {
            {/* v (NFT.attributes) is the object that contains the details we need */}
            const { price, nftAddress, tokenId, seller } = NFT // object 0 first item the listedNFTs.activeItems array

            return(
              <div key={index}>
                {/* Price: {price}. NFT Address: {nftAddress}. Token Id: {tokenId}. Seller: {seller} */}
                <NFTBox
                  key={index}
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  marketplaceAddress={marketplaceAddress}
                  seller={seller}
                />
              </div>
            )
          }) : (<div>Web3 currently not enabled. Connect your wallet!!</div>)}
      </div>
    </div>
  )
}
