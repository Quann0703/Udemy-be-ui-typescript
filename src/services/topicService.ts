import httpRequest from "~/utils/httpRequest";

const getTopics = async ({ page }: { page: number }) => {
  return await httpRequest.get("/topics", {
    params: {
      page,
    },
  });
};
const getField = async () => {
  return await httpRequest.get("/dashboard/field");
};
const createTopics = async (data: any) => {
  return await httpRequest.post("/topics", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateTopics = async (data: any, id: number) => {
  return await httpRequest.put("/topics/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteTopics = async (id: number) => {
  return await httpRequest.delete("/topics/" + id);
};

const userService = {
  getTopics,
  getField,
  createTopics,
  updateTopics,
  deleteTopics,
};

export default userService;
