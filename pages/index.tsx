import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { NFTStorage } from "nft.storage";

const token = process.env.NEXT_PUBLIC_IPFS_CLIENT_TOKEN || "";
const client = new NFTStorage({ token });

const TestMintNFT: NextPage = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const onChange = (event: React.SyntheticEvent) => {
    // @ts-ignore
    setAssets([...event.target.files]);
  };

  useEffect(() => {
    console.log(assets);
  }, [assets]);

  const getNFT = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const cid = prompt("Describe CID here");
      if (cid) {
        const data = await client.check(cid);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mintNFT = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const data = await NFTStorage.encodeDirectory(assets);
      console.log(data);
      const car = await client.storeCar(data.car);
      console.log(car);
    } catch (err) {
      console.log(err);
    }
  };

  const forgetNFT = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const cid = prompt("Describe CID here");
      if (cid) {
        const data = await client.delete(cid);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Create NFT</title>
      </Head>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          Mint New NFT
        </Typography>

        <Box sx={{ display: "flex", mb: 2 }}>
          {assets.map((i, k) => (
            <Box
              sx={{
                width: "80px",
                height: "80px",
                position: "relative",
                bgcolor: "silver",
                borderRadius: "8px",
                overflow: "hidden",
                mr: 2,
              }}
              key={k}
            >
              {i.type.startsWith("image") ? (
                <Image
                  alt={i.title}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={URL.createObjectURL(i)}
                  src={URL.createObjectURL(i)}
                />
              ) : i.type.startsWith("audio") ? (
                <audio controls src={URL.createObjectURL(i)} style={{ width: "100%" }} ref={null} />
              ) : (
                <video controls src={URL.createObjectURL(i)} style={{ width: "100%" }} ref={null} />
              )}
            </Box>
          ))}
        </Box>

        <form onSubmit={mintNFT}>
          <input type="file" multiple onChange={onChange} />
          <input type="submit" value="Upload" style={{ margin: "0 8px" }} />
          <input type="button" value="Fetch" onClick={getNFT} />
          <input type="button" value="Forget" onClick={forgetNFT} />
        </form>
      </Box>
    </>
  );
};

export default TestMintNFT;
