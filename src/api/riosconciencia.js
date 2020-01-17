import { RIOSCONCIENCIA_API } from "@/config/data-providers.js";
import axios from "axios";

const _basicHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
};

const getMasterData = async () => {
  const url = `${RIOSCONCIENCIA_API.public}/GetSectionsMasterData`;
  const res = await axios.get(url, {
    headers: _basicHeaders
  });
  return res.data;
};

export { getMasterData };
