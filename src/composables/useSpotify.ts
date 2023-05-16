import axios from "axios";
import { Buffer } from "buffer";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENTID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENTSECRET;
const URL = "https://api.spotify.com/v1";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SEARCH_URL = `${URL}/search`;

export const useSpotify = () => {
  const authToken = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const getAccessToken = async () => {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Missing Spotify client ID or client secret");
    }

    try {
      const data = {
        grant_type: "client_credentials",
      };

      const response = await axios.post(TOKEN_URL, data, {
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data.access_token;
    } catch (error) {
      console.error(error);
    }
  };

  const searchForItem = async (query: string) => {
    const accessToken = await getAccessToken();
    if (!accessToken) throw new Error("Missing access token");
    try {
      const response = await axios.get(SEARCH_URL, {
        params: {
          q: query,
          type: "track",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTrack = async (id: string) => {
    const accessToken = await getAccessToken();
    if (!accessToken) throw new Error("Missing access token");
    try {
      const response = await axios.get(`${URL}/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    searchForItem,
    getTrack,
  };
};
