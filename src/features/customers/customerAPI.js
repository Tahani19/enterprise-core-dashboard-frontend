import API
from "../../services/api";



export const getCustomers =
async (
  page = 1,
  search = ""
) => {

  const { data } =
    await API.get(

      `/customers?page=${page}&search=${search}`

    );

  return data;
};



export const createCustomer =
async (customerData) => {

  const { data } =
    await API.post(
      "/customers",
      customerData
    );

  return data;
};