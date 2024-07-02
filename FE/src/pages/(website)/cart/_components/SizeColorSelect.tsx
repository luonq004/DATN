import React, { useState } from "react";

const SizeColorSelector = ({ attribute, onChangeAttribute }: { attribute: any, onChangeAttribute: any }) => {
    const [size, setSize] = useState<keyof typeof colorOptions | null>("S");
    const [color, setColor] = useState<string | null>("#3cec45");

    // State tạm thời
    const [tempSize, setTempSize] = useState<keyof typeof colorOptions | null>(size);
    const [tempColor, setTempColor] = useState<string | null>(color);

    const sizeOptions = ["M", "S", "L", "XXL"];
    const colorOptions: { [key: string]: string[] } = {
        M: ["#ff1f1f", "#2ff11d", "#1d61f3"],
        S: ["#e9ec3c", "#3cec45", "#38e2ee"],
        L: ["#3a55f0", "#ea3af0", "#f03a3a"],
        XXL: ["#e0e0e0"]
    };

    const handleSizeClick = (size: any) => {
        setTempSize(size);
        setTempColor(colorOptions[size][0]);
    };

    const handleColorClick = (color: any) => {
        setTempColor(color);

    };

    const handleSave = () => {
        const confirm = window.confirm("Bạn có chắc chắn muốn lưu không?");
        if (confirm) {
            if (tempSize && tempColor) {
                setSize(tempSize);
                setColor(tempColor);
                changeAttribute(1);
            } else {
                console.log("Hãy chọn màu và size trước khi lưu!");
            }
        }
    };

    const changeAttribute = (number: number) => {
        onChangeAttribute(number);
    };

    return (
        <>
            <div className="flex items-center gap-3 border rounded-md py-1 px-3 cursor-pointer max-sm:*:text-[14px]" onClick={() => attribute !== 2 ? changeAttribute(2) : changeAttribute(1)}>
                <div>
                    <p>{size}</p>
                </div>
                <div className="bg-[#C3D2CC] px-1.5 max-sm:px-1 h-[2px]"></div>
                <div className={`w-4 max-sm:w-3 h-4 max-sm:h-3 rounded-full`} style={{ backgroundColor: color || undefined }}></div>
                <div className={`transition-all duration-500 ${attribute === 2 ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                        <path fill="black" d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z" />
                    </svg>
                </div>
            </div>
            <div className={`absolute bg-background py-3 px-4 left-1/2 max-sm:left-[5%] -translate-x-1/2 border-2 border-border1 rounded-md transition-all duration-500 ${attribute === 2 ? 'opacity-100 top-[130%] z-10' : 'opacity-0 top-[90%] z-[-1]'}`}>
                <div className="flex flex-col gap-2 mb-2">
                    <h1 className="font-medium">Select size</h1>
                    <div className="flex gap-2">
                        {sizeOptions.map((size) => (
                            <div
                                key={size}
                                className={`relative px-5 py-4 rounded-md cursor-pointer hover:border-background1 transition-all ${tempSize === size ? "bg-background1 text-background" : "bg-background2 text-background1 hover:bg-border1 hover:text-black"
                                    } border-2 ${tempSize === size ? "border-background1" : "border-[#efefef]"
                                    }`}
                                onClick={() => handleSizeClick(size)}
                            >
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] font-medium">
                                    {size}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                    <h1 className="font-medium">Select color</h1>
                    {tempSize && (
                        <div className="flex gap-2">
                            {colorOptions[tempSize].map((color: any) => (
                                <div
                                    key={color}
                                    className={`p-1 border-2 rounded-full cursor-pointer hover:border-background1 transition-all ${tempColor === color ? "border-background1" : "border-border2"
                                        }`}
                                    onClick={() => handleColorClick(color)}
                                >
                                    <div
                                        className={`relative p-2.5 rounded-full`}
                                        style={{ backgroundColor: color }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-between">
                    <div className="p-1 hover:text-red-500 cursor-pointer" onClick={() => changeAttribute(1)}>Cancel</div>
                    <button onClick={handleSave} className="py-1 px-3 bg-background border border-background1 text-background1 rounded-sm hover:bg-background1 hover:text-background transition-all duration-300">Save</button>
                </div>
            </div>
        </>
    );
};

export default SizeColorSelector;
