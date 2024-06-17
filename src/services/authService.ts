import httpRequest from "~/utils/httpRequest";

const register = async (data: any) => {
  return await httpRequest.post("/auth/registerAdmin", { ...data });
};
const login = async (data: any) => {
  return await httpRequest.post("/auth/login", { ...data });
};

const logout = async () => {
  return httpRequest.get("/auth/logout");
};

const getCurrentUser = async () => {
  return httpRequest.get("/auth/current-user");
};
const authService = { register, login, logout, getCurrentUser };
export default authService;
