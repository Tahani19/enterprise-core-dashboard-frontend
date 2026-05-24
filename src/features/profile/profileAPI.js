import API from "../../services/api";

export const getProfile = async () => {
  const { data } =
    await API.get("/users/profile");

  return data;
};

export const updateProfile =
  async (formData) => {

    const { data } =
      await API.put(
        "/users/profile",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return data;
  };