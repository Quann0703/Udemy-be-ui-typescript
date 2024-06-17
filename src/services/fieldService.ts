import httpRequest from "~/utils/httpRequest";

const getFields = async ({ page }: { page: number }) => {
  return await httpRequest.get("/fields", {
    params: {
      page,
    },
  });
};
const getCategory = async () => {
  return await httpRequest.get("/dashboard/category");
};
const createFields = async (data: any) => {
  return await httpRequest.post("/fields", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateFields = async (data: any, id: number) => {
  return await httpRequest.put("/fields/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteFields = async (id: number) => {
  return await httpRequest.delete("/fields/" + id);
};

const userService = {
  getFields,
  createFields,
  updateFields,
  deleteFields,
  getCategory,
};

export default userService;
