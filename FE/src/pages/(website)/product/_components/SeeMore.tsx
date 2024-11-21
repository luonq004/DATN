import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentUser from "./CommentUser";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SeeMore = () => {
  const [value, setValue] = useState("");

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block",
  ];

  return (
    <div className="md:px-6">
      <Tabs defaultValue="comment">
        <TabsList className="flex w-full grid-cols-2 justify-center bg-transparent">
          <div className="pr-4 border-r">
            <TabsTrigger
              className="py-2 px-8 text-[11px] data-[state=active]:rounded-full data-[state=active]:bg-[#b8cd06] data-[state=active]:text-white uppercase font-raleway"
              value="description"
            >
              mô tả
            </TabsTrigger>
          </div>
          <div className="pl-4">
            <TabsTrigger
              className="py-2 px-8 text-[11px] data-[state=active]:rounded-full data-[state=active]:bg-[#b8cd06] data-[state=active]:text-white uppercase font-raleway"
              value="comment"
            >
              đánh giá
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="description">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
                ["clean"],
              ],
            }}
            formats={formats}
            // readOnly={isDisabled}
          />
        </TabsContent>
        <TabsContent value="comment">
          <div className="h-[30px] md:h-[60px]"></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <CommentUser key={index} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeeMore;
