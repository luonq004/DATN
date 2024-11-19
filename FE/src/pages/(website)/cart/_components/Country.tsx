import axios from "axios";
import { useEffect, useState, forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}

interface CountryProps {
  onCityChange: (cityId: string) => void;
  onDistrictChange: (districtId: string) => void;
  onWardChange: (wardId: string) => void;
  city?: string; // Truyền tên tỉnh thành đã chọn
  district?: string; // Truyền tên quận huyện đã chọn
  ward?: string; // Truyền tên phường xã đã chọn
}

const Country = forwardRef<HTMLDivElement, CountryProps>(({
  onCityChange,
  onDistrictChange,
  onWardChange,
  city,
  district,
  ward
}, ref) => {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        const data: City[] = response.data;
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (cityId: string) => {
    const city = cities.find((city) => city.Id === cityId) || null;
    if (city) {
      setDistricts(city.Districts); // Cập nhật quận huyện mới
      setWards([]); // Reset danh sách xã phường
      onCityChange(city.Name); // Cập nhật tên tỉnh/thành phố
      onDistrictChange(""); // Reset quận
      onWardChange(""); // Reset xã
    } else {
      setDistricts([]);
      setWards([]);
      onCityChange(""); // Gọi callback khi không có tỉnh/thành phố được chọn
      onDistrictChange(""); // Reset quận
      onWardChange(""); // Reset xã
    }
  };

  const handleDistrictChange = (districtId: string) => {
    const district = districts.find((district) => district.Id === districtId) || null;
    if (district) {
      setWards(district.Wards); // Cập nhật phường/xã mới
      onDistrictChange(district.Name); // Cập nhật tên quận/huyện
    } else {
      setWards([]);
      onDistrictChange(""); // Gọi callback khi không có quận/huyện được chọn
      onWardChange(""); // Reset xã khi quận thay đổi
    }
  };

  const handleWardChange = (wardId: string) => {
    const ward = wards.find((ward) => ward.Id === wardId) || null;
    if (ward) {
      onWardChange(ward.Name); // Cập nhật tên phường/xã
    } else {
      onWardChange(""); // Reset xã khi phường thay đổi
    }
  };

  return (
    <div ref={ref}>
      <Select onValueChange={handleCityChange} value={city}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn tỉnh thành">{city || "Chọn tỉnh thành"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.Id} value={city.Id}>
              {city.Name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={handleDistrictChange}
        value={district}
        disabled={districts.length === 0 || !city}
      >
        <SelectTrigger>
          <SelectValue placeholder="Chọn quận huyện">{district || "Chọn quận huyện"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {districts.map((district) => (
            <SelectItem key={district.Id} value={district.Id}>
              {district.Name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={handleWardChange}
        value={ward}
        disabled={wards.length === 0 || !district}
      >
        <SelectTrigger>
          <SelectValue placeholder="Chọn phường xã">{ward || "Chọn phường xã"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {wards.map((ward) => (
            <SelectItem key={ward.Id} value={ward.Id}>
              {ward.Name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

export default Country;
