import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
    return (
        <div className="relative m-10">
            <Search className="w-4 h-4 absolute top-3 left-3 text-slate-600" />
            <Input
                className="w-full md:w-[500px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200 "
                placeholder="Tìm kiếm "
            />
        </div>
    );
};

export default SearchInput;