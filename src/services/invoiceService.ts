import httpRequest from "~/utils/httpRequest";

const getInvoices = async ({ page }: { page: number }) => {
  return await httpRequest.get("/invoices", {
    params: {
      page,
    },
  });
};

const getInvoiceId = async (id: number) => {
  return await httpRequest.get("/invoices/" + id);
};

const getCourse = async () => {
  return await httpRequest.get("/dashboard/course");
};

const getUser = async () => {
  return await httpRequest.get("/dashboard/user");
};

const createInvoices = async (data: any) => {
  return await httpRequest.post("/invoices", data);
};

const updateInvoices = async (data: any, id: number) => {
  return await httpRequest.put("/invoices/" + id, data);
};

const deleteInvoices = async (id: number) => {
  return await httpRequest.delete("/invoices/" + id);
};

const userService = {
  getInvoices,
  getCourse,
  getUser,
  createInvoices,
  updateInvoices,
  deleteInvoices,
  getInvoiceId,
};

export default userService;
