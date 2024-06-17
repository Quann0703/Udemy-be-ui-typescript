import httpRequest from "~/utils/httpRequest";

const getCourses = async ({ page }: { page: number }) => {
  return await httpRequest.get("/courses", {
    params: {
      page,
    },
  });
};

const getTopic = async () => {
  return await httpRequest.get("/dashboard/topic");
};

const getUser = async () => {
  return await httpRequest.get("/dashboard/user");
};

const createCourses = async (data: any) => {
  return await httpRequest.post("/courses", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateCourses = async (data: any, id: number) => {
  return await httpRequest.put("/courses/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteCourses = async (id: number) => {
  return await httpRequest.delete("/courses/" + id);
};

const userService = {
  getCourses,
  getTopic,
  getUser,
  createCourses,
  updateCourses,
  deleteCourses,
};

export default userService;
