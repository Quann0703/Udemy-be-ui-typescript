import httpRequest from "~/utils/httpRequest";

const getLessonByCourseId = async ({
  page,
  courseId,
}: {
  page: number;
  courseId: number;
}) => {
  return await httpRequest.get("/lessons", {
    params: {
      page,
      courseId,
    },
  });
};

const getCourse = async () => {
  return await httpRequest.get("/dashboard/course");
};

const createLesson = async (data: any) => {
  return await httpRequest.post("/lessons", data);
};

const updateLesson = async (data: any, id: number) => {
  return await httpRequest.put("/lessons/" + id, data);
};

const deleteLesson = async (id: number) => {
  return await httpRequest.delete("/lessons/" + id);
};

const lessonService = {
  getLessonByCourseId,
  getCourse,
  createLesson,
  updateLesson,
  deleteLesson,
};

export default lessonService;
