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

const getAllUsers = async (token) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllUsers`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.get(url, {
    headers: _basicHeaders,
  });
  return res.data;
};

const getAllUserRoles = async (token) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllUserRoles`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.get(url, {
    headers: _basicHeaders,
  });
  return res.data;
};

const getAllMunicipalities = async (token) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllMunicipalities`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.get(url, {
    headers: _basicHeaders,
  });
  return res.data;
};

const getAllRivers = async (token) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllRivers`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.get(url, {
    headers: _basicHeaders,
  });
  return res.data;
};

const getAllRiverSections = async (token) => {
  const url = `${RIOSCONCIENCIA_API.public}/GetAllRiverSections`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.get(url, {
    headers: _basicHeaders,
  });
  return res.data;
};

const createRiverSection = async (token, riverSection) => {
  const url = `${RIOSCONCIENCIA_API.public}/CreateRiverSection`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.post(url, riverSection, {
    headers: _basicHeaders,
  });
  return res.data;
};
const updateRiverSection = async (token, riverSectionId, riverSection) => {
  const url = `${RIOSCONCIENCIA_API.public}/UpdateRiverSection/${riverSectionId}`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.put(url, riverSection, {
    headers: _basicHeaders,
  });
  return res.data;
};

const registerUser = async (token, user) => {
  const url = `${RIOSCONCIENCIA_API.public}/Register`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.post(url, user, {
    headers: _basicHeaders,
  });
  return res.data;
};

const updateUser = async (token, userId, user) => {
  const url = `${RIOSCONCIENCIA_API.public}/UpdateUser/${userId}`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.put(url, user, {
    headers: _basicHeaders,
  });
  return res.data;
};

const disableUser = async (token, userId) => {
  const url = `${RIOSCONCIENCIA_API.public}/DisableUser/${userId}`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.put(
    url,
    {},
    {
      headers: _basicHeaders,
    },
  );
  return res.data;
};

const assignSectionToUser = async (token, payload) => {
  const url = `${RIOSCONCIENCIA_API.public}/AssignSectionToUser`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.put(url, payload, {
    headers: _basicHeaders,
  });
  return res.data;
};

const dellocateRiverSection = async (token, payload) => {
  const url = `${RIOSCONCIENCIA_API.public}/DellocateRiverSection`;
  _basicHeaders.Authorization = `Bearer ${token}`;
  const res = await axios.put(url, payload, {
    headers: _basicHeaders,
  });
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
  registerUser,
  updateUser,
  disableUser,
  assignSectionToUser,
  dellocateRiverSection,
};
