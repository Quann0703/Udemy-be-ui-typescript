import httpRequest from "~/utils/httpRequest";

const getCategories = async ({ page }: { page: number }) => {
  return await httpRequest.get("/categories", {
    params: {
      page,
    },
  });
};

const createCategories = async (data: any) => {
  return await httpRequest.post("/categories", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateCategories = async (data: any, id: number) => {
  return await httpRequest.put("/categories/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteCategories = async (id: number) => {
  return await httpRequest.delete("/categories/" + id);
};

const userService = {
  getCategories,
  createCategories,
  updateCategories,
  deleteCategories,
};

export default userService;
