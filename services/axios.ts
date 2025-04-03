import axios from "axios";
import { env } from "../env";
export const azureBlobServer = axios.create();

export const nubaServer = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL_NUBA,
  responseType: "json",
});
