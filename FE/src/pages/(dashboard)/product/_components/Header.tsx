import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgePlus, LayoutGrid, TableProperties } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentLayout = searchParams.get("layout") || "table";

  function handleChange(layout: string) {
    searchParams.set("layout", layout);

    // if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <div className="sm:flex justify-between items-center">
      <h4 className="text-xl font-medium">Products</h4>

      <div className="flex gap-10">
        <Tabs
          defaultValue={currentLayout}
          onValueChange={(layout) => handleChange(layout)}
        >
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="table">
                <TableProperties />
              </TabsTrigger>
              <TabsTrigger value="grid">
                <LayoutGrid />
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <Link to="add">
          <Button className="text-lg font-light flex gap-3 px-4 bg-orange-500">
            <BadgePlus />{" "}
            <span className="hidden md:block">Add new product</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
