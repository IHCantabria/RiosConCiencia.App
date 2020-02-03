import { RIOSCONCIENCIA_API } from "@/config/data-providers.js";
import axios from "axios";

const _basicHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
};

const login = async (email, password) => {
  const url = `${RIOSCONCIENCIA_API.public}/Authenticate`;
  const auth = {
    email: email,
    password: password
  };
  const res = await axios.post(url, auth);
  return res.data;
};

const getUserRiverSections = async (token, userId) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetRiverSectionsByUserId/${userId}`;

  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.get(url, {
    headers: _basicHeaders
  });
  return res.data;
};

const getMasterData = async token => {
  const url = `${RIOSCONCIENCIA_API.public}/GetSectionsMasterData`;

  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.get(url, {
    headers: _basicHeaders
  });
  return res.data;
};

const saveSample = async (token, sample) => {
  const url = `${RIOSCONCIENCIA_API.public}/SaveSample`;

  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.post(url, sample, {
    headers: _basicHeaders
  });
  return res;
};

export { getMasterData, login, getUserRiverSections, saveSample };
