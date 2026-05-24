import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import DashboardLayout
from "../layouts/DashboardLayout";



const Profile = () => {

  const [user, setUser] =
    useState(null);

  const [password,
    setPassword] =
    useState("");

  const [image,
    setImage] =
    useState(null);



  const fetchProfile =
    async () => {

      try {

        const { data } =
          await API.get(
            "/users/profile"
          );

        setUser(data);

      } catch (error) {

        console.log(error);
      }
    };



  useEffect(() => {

    fetchProfile();

  }, []);



  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const formData =
          new FormData();

        formData.append(
          "password",
          password
        );

        if (image) {

          formData.append(
            "image",
            image
          );
        }



        // الادمن فقط

        if (
          user.role ===
          "Admin"
        ) {

          formData.append(
            "name",
            user.name
          );

          formData.append(
            "email",
            user.email
          );

          formData.append(
            "role",
            user.role
          );

          formData.append(
            "position",
            user.position
          );
        }

        await API.put(
          "/users/profile",
          formData
        );

        alert(
          "Updated Successfully"
        );

      } catch (error) {

        console.log(error);
      }
    };



  if (!user) {

    return <p>Loading...</p>;
  }

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-[#f4f7fb] p-8">

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-indigo-700 to-blue-500 h-48" />



          <div className="p-10">

            <div className="flex items-center gap-8 -mt-24">

              <img
                src={
                  user.image
                    ? `http://localhost:5000${user.image}`
                    : "https://i.pravatar.cc/300"
                }
                alt=""
                className="w-40 h-40 rounded-full border-[6px] border-white object-cover shadow-xl"
              />



              <div>

                <h1 className="text-5xl font-bold text-gray-800">
                  {user.name}
                </h1>

                <p className="text-xl text-gray-500 mt-2">
                  {user.email}
                </p>

                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm mt-4 inline-block">
                  {user.role}
                </span>

              </div>
            </div>



            <form
              onSubmit={
                handleSubmit
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
            >

              {/* NAME */}

              <div>

                <label className="font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={user.name}
                  disabled={
                    user.role !==
                    "Admin"
                  }
                  onChange={(e) =>
                    setUser({
                      ...user,
                      name:
                        e.target.value,
                    })
                  }
                  className="w-full border p-4 rounded-xl mt-2 bg-gray-50"
                />

              </div>



              {/* EMAIL */}

              <div>

                <label className="font-semibold text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={user.email}
                  disabled={
                    user.role !==
                    "Admin"
                  }
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email:
                        e.target.value,
                    })
                  }
                  className="w-full border p-4 rounded-xl mt-2 bg-gray-50"
                />

              </div>



              {/* POSITION */}

              <div>

                <label className="font-semibold text-gray-700">
                  Position
                </label>

                <input
                  type="text"
                  value={
                    user.position
                  }
                  disabled={
                    user.role !==
                    "Admin"
                  }
                  onChange={(e) =>
                    setUser({
                      ...user,
                      position:
                        e.target.value,
                    })
                  }
                  className="w-full border p-4 rounded-xl mt-2 bg-gray-50"
                />

              </div>



              {/* ROLE */}

              <div>

                <label className="font-semibold text-gray-700">
                  Role
                </label>

                <select
                  value={user.role}
                  disabled={
                    user.role !==
                    "Admin"
                  }
                  onChange={(e) =>
                    setUser({
                      ...user,
                      role:
                        e.target.value,
                    })
                  }
                  className="w-full border p-4 rounded-xl mt-2 bg-gray-50"
                >
                  <option>
                    Admin
                  </option>

                  <option>
                    Manager
                  </option>

                  <option>
                    Employee
                  </option>
                </select>

              </div>



              {/* PASSWORD */}

              <div className="md:col-span-2">

                <label className="font-semibold text-gray-700">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="w-full border p-4 rounded-xl mt-2"
                />

              </div>



              {/* IMAGE */}

              <div className="md:col-span-2">

                <label className="font-semibold text-gray-700">
                  Upload Image
                </label>

                <input
                  type="file"
                  onChange={(e) =>
                    setImage(
                      e.target.files[0]
                    )
                  }
                  className="w-full border p-4 rounded-xl mt-2 bg-white"
                />

              </div>



              <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg transition-all md:col-span-2">

                Save Changes

              </button>

            </form>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Profile;