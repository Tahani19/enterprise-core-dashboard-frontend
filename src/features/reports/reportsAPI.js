import API from "../../services/api";

export const getDashboardReport =
async () => {

  const { data } =
    await API.get(
      "/reports/dashboard"
    );

  return data;
};