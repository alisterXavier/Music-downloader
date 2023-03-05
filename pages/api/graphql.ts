import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import axios from "axios";

const typeDefs = gql`
  type Query {
    search(query: String!): searchRes
    download(id: String!): Download
  }

  type Download {
    download_url: String
  }

  type searchRes {
    songs: [Song]
  }

  type Song {
    id: String
    name: String
    title: String
    thumbnail: String
    download: String
  }
`;

const resolvers = {
  Query: {
    search: async (_: any, { query }) => {
      const optionsMain = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/v2/search",
        params: { query: query },
        headers: {
          "X-RapidAPI-Key":
            "b34fac19dbmshb7bbf2f06859223p1a2ed9jsn1c8a3226d741",
          "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
        },
      };

      const res = await axios
        .request(optionsMain)
        .then(function (response) {
          return response.data.result.songs.map((results) => {
            return {
              id: results.id,
              name: results.name,
              title: results.title,
              thumbnail: results.thumbnail,
            };
          });
        })
        .catch((err) => {
          if(err.code === "ERR_BAD_RESPONSE")
            return new Error("api down")
        });
      return { songs: res };
    },
    download: async (_: any, { id }) => {
      const optionsDownload = {
        method: "GET",
        url: "https://youtube-music1.p.rapidapi.com/get_download_url",
        params: { id: id, ext: "mp3" },
        headers: {
          "X-RapidAPI-Key":
            "b34fac19dbmshb7bbf2f06859223p1a2ed9jsn1c8a3226d741",
          "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
        },
      };
      const url = await axios.request(optionsDownload).then((response) => {
        return response.data.result;
      });
      return url;
    },
  },
};

let apolloServer: any;

apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer)