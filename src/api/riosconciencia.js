import { RIOSCONCIENCIA_API } from "@/config/data-providers.js";
import axios from "axios";

const _basicHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
};

const login = async (email, password) => {
  const url = `${RIOSCONCIENCIA_API.public}/Authenticate`;
  const auth = {
    email: email,
    password: password,
  };
  const res = await axios.post(url, auth);
  return res.data;
};

const getUserRiverSections = async (token, userId) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetRiverSectionsByUserId/${userId}`;

  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.get(url, {
    headers: _basicHeaders,
  });
  return res.data;
};

const getExpertMasterData = async (token) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetSectionsExpertMasterData`;

  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.get(url, {
    headers: _basicHeaders,
  });
  return res.data;
};

const getPictsMasterData = async (token) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetSectionsPictsMasterData`;

  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.get(url, {
    headers: _basicHeaders,
  });
  return res.data;
};

const saveSample = async (token, sample) => {
  const url = `${RIOSCONCIENCIA_API.public}/SaveSample`;

  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.post(url, sample, {
    headers: _basicHeaders,
  });
  return res;
};

const saveSamplePict = async (token, sample) => {
  const url = `${RIOSCONCIENCIA_API.public}/SaveSamplePict`;

  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.post(url, sample, {
    headers: _basicHeaders,
  });
  return res;
};

const getAllUsers = async () => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllUsers`;
  const res = await axios.get(url);
  return res.data;
};

const getAllUserRoles = async () => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllUserRoles`;
  const res = await axios.get(url);
  return res.data;
};

const getAllMunicipalities = async () => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllMunicipalities`;
  const res = await axios.get(url);
  return res.data;
};

const getAllRivers = async () => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllRivers`;
  const res = await axios.get(url);
  return res.data;
};

const getAllRiverSections = async () => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllRiverSections`;
  const res = await axios.get(url);
  return res.data;
};

const createRiverSection = async (riverSection) => {
  const url = `${RIOSCONCIENCIA_API.public}/CreateRiverSection`;
  const res = await axios.post(url, riverSection);
  return res.data;
};
const updateRiverSection = async (riverSectionId, riverSection) => {
  const url = `${RIOSCONCIENCIA_API.public}/UpdateRiverSection/${riverSectionId}`;
  const res = await axios.put(url, riverSection);
  return res.data;
};

export {
  getExpertMasterData,
  getPictsMasterData,
  login,
  getUserRiverSections,
  saveSample,
  saveSamplePict,
  getAllUsers,
  getAllUserRoles,
  getAllMunicipalities,
  getAllRivers,
  getAllRiverSections,
  createRiverSection,
  updateRiverSection,
};
