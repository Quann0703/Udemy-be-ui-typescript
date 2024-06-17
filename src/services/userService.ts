import httpRequest from "~/utils/httpRequest";

const getUsers = async ({ page }: { page: number }) => {
  return await httpRequest.get("/users", {
    params: {
      page,
    },
  });
};

const createUser = async (data: any) => {
  return await httpRequest.post("/users", data);
};

const updateUser = async (data: any, id: number) => {
  return await httpRequest.put("/users/" + id, data);
};

const deleteUser = async (id: number) => {
  return await httpRequest.delete("/users/" + id);
};

const userService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
