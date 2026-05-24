import api from "../../services/api";



export const getEmployees =
  async () => {

    const token =
      localStorage.getItem("token");



    const response =
      await api.get(
        "/employees",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );



    return response.data;
};



export const createEmployee =
  async (employeeData) => {

    const token =
      localStorage.getItem("token");



    const response =
      await api.post(
        "/employees",
        employeeData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );



    return response.data;
};



export const updateEmployee =
  async (id, employeeData) => {

    const token =
      localStorage.getItem("token");



    const response =
      await api.put(
        `/employees/${id}`,
        employeeData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );



    return response.data;
};



export const deleteEmployee =
  async (id) => {

    const token =
      localStorage.getItem("token");



    const response =
      await api.delete(
        `/employees/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );



    return response.data;
};