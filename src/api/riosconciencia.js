import { RIOSCONCIENCIA_API } from "@/config/data-providers.js";
import axios from "axios";

const _basicHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
};

const login = async () => {
  const url = `${RIOSCONCIENCIA_API.public}/Authenticate`;
  //hardcoded user - dev purpose
  const auth = {
    email: "admin@admin.com",
    password: "admin"
  };

  const res = await axios.post(url, auth);

  return res.data;
};

const getUserRiverSections = async () => {
  return [];
};

const getMasterData = async token => {
  const url = `${RIOSCONCIENCIA_API.public}/GetSectionsMasterData`;
  /* Development */
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjU2NiIsIm5iZiI6MTU3OTg2NjE1NSwiZXhwIjoxNTgwNDcwOTU1LCJpYXQiOjE1Nzk4NjYxNTV9.CAoncGlSpvNvy954yyS7PI8S-q4ngbsu_DSuImwZWOI";
  /**/
  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.get(url, {
    headers: _basicHeaders
  });
  return res.data;
};

const postResults = async (token, results) => {
  const url = `${RIOSCONCIENCIA_API.public}/SaveSample`;
  /* Development */
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjU2NiIsIm5iZiI6MTU3OTg2NjE1NSwiZXhwIjoxNTgwNDcwOTU1LCJpYXQiOjE1Nzk4NjYxNTV9.CAoncGlSpvNvy954yyS7PI8S-q4ngbsu_DSuImwZWOI";
  /**/
  _basicHeaders.Authorization = `Bearer ${token}`;

  const res = await axios.post(url, {
    headers: _basicHeaders,
    results: results
  });
  return res;
};

export { getMasterData, login, getUserRiverSections, postResults };
