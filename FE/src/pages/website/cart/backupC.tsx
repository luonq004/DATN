import axios from "axios";
import React, { useEffect, useState, forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"; 

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
  onCityChange: (cityId: string) => void; // Callback khi tỉnh/thành phố thay đổi
  onDistrictChange: (districtId: string) => void; // Callback khi quận/huyện thay đổi
  onWardChange: (wardId: string) => void; // Callback khi phường/xã thay đổi
}

const Country1 = forwardRef<HTMLDivElement, CountryProps>(({
  onCityChange,
  onDistrictChange,
  onWardChange,
}, ref) => {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null); // State lưu trữ tỉnh/thành phố được chọn
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null); // State lưu trữ quận/huyện được chọn
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null); // State lưu trữ phường/xã được chọn

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        const data: City[] = response.data;
        setCities(data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const handleCityChange = (cityId: string) => {
    const city = cities.find((city) => city.Id === cityId) || null;
    setSelectedCity(city);
    if (city) {
      setDistricts(city.Districts);
      setWards([]);
      onCityChange(city.Name); 
    } else {
      setDistricts([]);
      setWards([]);
      onCityChange(""); // Gọi callback khi không có tỉnh/thành phố được chọn
    }
  };

  const handleDistrictChange = (districtId: string) => {
    const district = districts.find((district) => district.Id === districtId) || null;
    setSelectedDistrict(district);
    if (district) {
      setWards(district.Wards);
      onDistrictChange(district.Name); 
      // Gọi callback khi quận/huyện thay đổi
    } else {
      setWards([]);
      console.log(selectedWard);
      onDistrictChange(""); // Gọi callback khi không có quận/huyện được chọn
    }
  };

  const handleWardChange = (wardId: string) => {
    const ward = wards.find((ward) => ward.Id === wardId) || null;
    setSelectedWard(ward);
    if(ward){
      onWardChange(ward.Name); // Gọi callback khi phường/xã thay đổi
    }
    else{
      setWards([]);
      onWardChange("")
    }
  };

  return (
    <div ref={ref}>
      <Select onValueChange={handleCityChange}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn tỉnh thành" />
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
        disabled={districts.length === 0 || !selectedCity}
      >
        <SelectTrigger>
          <SelectValue placeholder="Chọn quận huyện" />
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
        disabled={wards.length === 0 || !selectedDistrict}
        onValueChange={handleWardChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Chọn phường xã" />
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

export default Country1;
