import API from "../../services/api";

// Get Products
/*export const getProducts =
async (
  page = 1,
  search = ""
) => {

  const { data } =
    await API.get(

      `/products?page=${page}&limit=10&search=${search}`

    );

  return data;
};*/
export const getProducts = async (page, limit, search) => {
  const { data } = await API.get(
    `/products?page=${page}&limit=${limit}&search=${search}`,
  );

  return data;
};

// Create Product
export const createProduct = async (productData) => {
  const { data } = await API.post("/products", productData);

  return data;
};

// Update Product
export const updateProduct = async (id, productData) => {
  const { data } = await API.put(`/products/${id}`, productData);

  return data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const { data } = await API.delete(`/products/${id}`);

  return data;
};
