import httpRequest from "~/utils/httpRequest";

const getRegisters = async ({ page }: { page: number }) => {
  return await httpRequest.get("/registers", {
    params: {
      page,
    },
  });
};

const getCourse = async () => {
  return await httpRequest.get("/dashboard/course");
};

const getUser = async () => {
  return await httpRequest.get("/dashboard/user");
};

const createRegisters = async (data: any) => {
  return await httpRequest.post("/registers", data);
};

const updateRegisters = async (data: any, id: number) => {
  return await httpRequest.put("/registers/" + id, data);
};

const deleteRegisters = async (id: number) => {
  return await httpRequest.delete("/registers/" + id);
};

const userService = {
  getRegisters,
  getCourse,
  getUser,
  createRegisters,
  updateRegisters,
  deleteRegisters,
};

export default userService;
