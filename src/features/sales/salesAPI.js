import API from "../../services/api";

// ======================
// GET SALES
// ======================

export const getSales = async (page = 1, limit = 10, search = "") => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { data } = await API.get(
    `/sales?page=${page}&limit=${limit}&search=${search}`,
  );

  return data;
};

// ======================
// CREATE SALE
// ======================

export const createSale = async (saleData) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { data } = await API.post("/sales", saleData, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });

  return data;
};

// ======================
// DELETE SALE
// ======================

export const deleteSale = async (id) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { data } = await API.delete(`/sales/${id}`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });

  return data;
};
