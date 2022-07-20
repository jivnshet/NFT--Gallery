import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import NFTCard from "./components/nftCard.js";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async () => {
    let nfts;
    console.log("Fetching NFTs");
    const api_key = "ZXQFDc5YM-NCExWvOlv_sAdUsrZ3THfd";
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${api_key}/getNFTs/`;

    if (!collectionAddress.length) {
      var requestOptions = {
        method: 'GET',
      };

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }
    else {
      console.log("Fetching NFTs for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAdreses%5B%5D=${collectionAddress}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collectionAddress.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>NFT Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col w-full justify-center items-center gap-y-2'>
        <input disabled={fetchForCollection} className='w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50' onChange={(e) => { setWalletAddress(e.target.value) }} value={wallet} type="text" placeholder='Add your Wallet Address' />
        <input className='w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50' onChange={(e) => { setCollectionAddress(e.target.value) }} value={collectionAddress} type="text" placeholder='Add the Collection Address' />

        <label className='text-gray-600' htmlFor=""><input className='mr-2' onChange={(e) => { setFetchForCollection(e.target.checked) }} type="checkbox" />Fetch for Collection</label>

        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 mb-5 rounded-sm w-1/5"} onClick={() => {
          if (fetchForCollection) {
            fetchNFTsForCollection();
          }
          else {
            fetchNFTs();
          }
        }}>Let's Go!</button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard id={nft} nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
