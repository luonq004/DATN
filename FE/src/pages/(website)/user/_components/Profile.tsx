import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const ProfilePageModern: React.FC = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const fetchUserData = async () => {
    if (user) {
      try {
        const clerkId = user.id;
        const response = await axios.get(
          `http://localhost:8080/api/users/${clerkId}`
        );
        const userData = response.data;

        const formatBirthdate = (dateString: string) => {
          const date = new Date(dateString);
          return !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "";
        };

        setPhone(userData.phone);
        setGender(userData.gender);
        setBirthdate(formatBirthdate(userData.birthdate));

        const profileImageUrl = userData.publicMetadata?.profileImageUrl;
        if (profileImageUrl) {
          setPreviewUrl(profileImageUrl);
        }
      } catch (error) {
        console.error("Error fetching user data from backend:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");

      if (!imageFile) {
        setPreviewUrl(user.imageUrl || "");
      }

      fetchUserData();
    }
  }, [user, imageFile]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      editField === "email" &&
      emailInputRef.current &&
      !emailInputRef.current.contains(event.target as Node)
    ) {
      setEditField(null);
    }
    if (
      editField === "phone" &&
      phoneInputRef.current &&
      !phoneInputRef.current.contains(event.target as Node)
    ) {
      setEditField(null);
    }
  };

  useEffect(() => {
    if (editField) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editField]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    const updateData: any = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      birthdate,
    };

    const formData = new FormData();

    // Thêm ảnh nếu có
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    // Thêm các trường khác vào form data
    Object.keys(updateData).forEach((key) => {
      formData.append(key, updateData[key]);
    });

    try {
      const clerkId = user?.id;
      const response = await axios.put(
        `http://localhost:8080/api/users/${clerkId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Cập nhật thành công!");
        const timestamp = new Date().getTime();
        setPreviewUrl(`${response.data.imageUrl}?${timestamp}`);
      } else {
        toast.error("Cập nhật không thành công, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="p-5 px-16 rounded-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3 border-zinc-400 mt-5">
        Hồ sơ của tôi
      </h1>
      <p className="text-green-500 mb-10">
        Cập nhật thông tin hồ sơ để bảo mật tài khoản!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* First Name and Last Name Fields */}
          <div className="mb-8">
            <div className="flex space-x-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Họ
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Tên"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Tên
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Họ"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-8">
            <label className="block font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center">
              <input
                ref={emailInputRef}
                type="text"
                value={email}
                readOnly={editField !== "email"}
                onChange={(e) => setEmail(e.target.value)}
                className={`border border-gray-300 rounded-lg px-3 py-2 w-full ${editField === "email" ? "bg-white" : "bg-gray-100"
                  }`}
              />
              {editField !== "email" && (
                <button
                  onClick={() => setEditField("email")}
                  className="ml-2 w-48 text-blue-500 hover:text-blue-700 transition duration-150"
                >
                  Thay đổi
                </button>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Số điện thoại
            </label>
            <div className="flex items-center">
              <input
                ref={phoneInputRef}
                type="text"
                value={phone}
                readOnly={editField !== "phone"}
                onChange={(e) => setPhone(e.target.value)}
                className={`border border-gray-300 rounded-lg px-3 py-2 w-full ${editField === "phone" ? "bg-white" : "bg-gray-100"
                  }`}
              />
              {editField !== "phone" && (
                <button
                  onClick={() => setEditField("phone")}
                  className="ml-2 w-48 text-blue-500 hover:text-blue-700 transition duration-150"
                >
                  Thay đổi
                </button>
              )}
            </div>
          </div>

          {/* Gender Selection */}
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Giới tính
            </label>
            <div className="flex items-center space-x-4">
              {["Nam", "Nữ", "Khác"].map((genderOption) => (
                <label className="cursor-pointer" key={genderOption}>
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={gender === genderOption}
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-2"
                  />
                  {genderOption}
                </label>
              ))}
            </div>
          </div>

          {/* Birthdate Field */}
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Ngày sinh
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="flex flex-col items-center justify-center">
          <label className="block font-semibold text-gray-700 mb-4">
            Ảnh đại diện
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="w-40 h-40 object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-40 h-40 bg-gray-100 p-6">
                <span className="text-gray-400">Chưa có ảnh</span>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4 text-sm text-blue-500 cursor-pointer focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default ProfilePageModern;
