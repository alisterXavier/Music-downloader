import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import Image from "next/image";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { SongsI } from "../../Types-interfaces";
import Navbar from "./Navbar";
import Vanta from "./Vanta";

const getSongs = gql`
  query Query($query: String!) {
    search(query: $query) {
      songs {
        id
        name
        thumbnail
        title
      }
    }
  }
`;
const getDownload_url = gql`
  query Query($downloadId: String!) {
    download(id: $downloadId) {
      download_url
    }
  }
`;

const Song = (SongsI: {
  id: string;
  name: string;
  thumbnail: string;
  title: string;
}) => {
  const [
    getDownload,
    {
      loading: loading_download_url,
      error: error_download_url,
      data: download_url,
    },
  ] = useLazyQuery(getDownload_url, { variables: { downloadId: SongsI.id } });

  const main = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    getDownload();
  };
  useEffect(() => {
    if (download_url) {
      window.open(download_url.download.download_url);
    }
  }, [download_url]);

  return (
    <div
      ref={main}
      className="song-wrapper cursor-pointer flex items-center justify-between"
    >
      <div className="flex">
        <figure className="">
          <Image
            alt={SongsI.name}
            src={SongsI.thumbnail}
            width={90}
            height={90}
            loading="lazy"
            crossOrigin="anonymous"
          />
        </figure>
        <div className="mx-5 my-auto">
          <p className="song-details">{SongsI.name}</p>
          <p className="song-details text-gray-400 text-sm">{SongsI.title}</p>
        </div>
      </div>
      <a href="#" onClick={handleClick} className="mr-5">
        <AiOutlineCloudDownload size={25} />
      </a>
    </div>
  );
};

const Songs = ({ query }) => {
  var { loading, error, data } = useQuery(getSongs, {
    variables: {
      query,
    },
  });

  const [songs, setSongs] = useState<SongsI[]>();

  useEffect(() => {
    if (data) setSongs(data.search.songs);
  }, [data]);

  return (
    <div className="w-full min-h-1/2 my-1">
      {songs ? songs.map((song) => <Song {...song} />) 
      : 
        <div className="">
          <Image alt="bunny down" src='https://media.tenor.com/rRlw_c7ugQAAAAAi/white-rabbit.gif' width={200} height={150}/>
          <h1 className="text-3xl">Server is down XD.</h1>
        </div> 
      }
    </div>
  );
};

const Results = () => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || null);

  useEffect(() => {
    if (router.query.search) setQuery(router.query.search);
  }, [router.asPath]);

  return (
    <Vanta>
      <div className="w-full absolute z-10 top-0">
        <Navbar />
        <div className="px-2 lg:p-5">
          <div className="songs-wrapper mx-auto">
            <h1 className="text-4xl lg:text-5xl w-full py-4">Songs List</h1>
            {query && <Songs query={query} />}
          </div>
        </div>
      </div>
    </Vanta>
  );
};
export default Results;
