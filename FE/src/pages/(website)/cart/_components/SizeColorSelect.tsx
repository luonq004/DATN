import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SizeColorSelector = ({ idProduct, idVariant, attribute, onChangeAttribute, idCart, onChangeVariant }: { idProduct: string, idVariant: string, attribute: any, onChangeAttribute: any, idCart: string, onChangeVariant: any }) => {
    const [selectedValue, setSelectedValue] = useState<{ [key: string]: any }>({});

    const changeAttribute = (idCart: string) => {
        onChangeAttribute(idCart);
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['variant_pro', idProduct],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/products/${idProduct}`)
            return data
        }
    })

    const { data: attri } = useQuery({
        queryKey: ['attribute', idProduct],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/attribute`)
            return data
        }
    })

    const variantOfProduct = data?.variants.find((variant: any) => variant._id === idVariant)
    const str = (variantOfProduct?.values.flatMap((value: any) => value.name))

    // console.log('data', data)
    // console.log('attri', attri)

    // useEffect để khởi tạo selectedAttributes dựa trên idVariant
    useEffect(() => {
        if (data && idVariant) {
            const selectedVariant = data?.variants.find((variant: any) => variant._id === idVariant);

            if (selectedVariant) {
                const variantProduct = attri?.reduce((acc: any, attr: any) => {
                    // console.log('attr', attr)
                    const uniqueValue = selectedVariant.values.find((value: any) =>
                        attr.values.includes(value._id)
                    );

                    if (uniqueValue) {
                        acc[attr._id] = uniqueValue._id;
                    }

                    return acc;
                }, {});

                setSelectedValue(variantProduct)
            }
        }
    }, [data, idVariant]);

    const handleAttributeChange = (attributeId: any, valueId: any) => {
        setSelectedValue((prev: any) => {
            const valueSelected = prev[attributeId] === valueId;

            if (valueSelected) {
                const { [attributeId]: removed, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [attributeId]: valueId
            };
        });
    };

    // console.log('selectedValue', selectedValue)

    // Mảng mới để chứa các variant
    const variantProduct = attri?.map((attr: any) => {
        const seenIds = new Set();

        const uniqueValues = data?.variants.flatMap((variant: any) =>
            variant.values.filter((value: any) =>
                attr.values.includes(value._id) && !seenIds.has(value._id) && seenIds.add(value._id)
            )
        );

        // console.log(uniqueValues)
        return {
            ...attr,
            values: uniqueValues
        };
    });

    // console.log('val2', variantProduct)
    // console.log('product', data);
    // console.log('mewAttri', variantProduct)

    const getCompatibleAttributeValues = () => {

        let filterVariants = data?.variants;

        // Lọc các variant dựa trên các thuộc tính đã chọn
        Object.keys(selectedValue).forEach((attributeId: any) => {
            // console.log(attributeId)
            const valueVariant = selectedValue[attributeId];
            // console.log('valueVariant', valueVariant)
            filterVariants = filterVariants.filter((variant: any) =>
                variant.values.some((value: any) => value._id === valueVariant)
            );
        });

        // console.log('filterVariants', filterVariants)

        const filterValues: { [key: string]: string[] } = {};

        // Tạo danh sách các giá trị thuộc tính tương thích
        attri?.forEach((attribute: any) => {
            const valuesSet = new Set();
            filterVariants?.forEach((variant: any) => {
                variant.values.forEach((value: any) => {
                    if (attribute.values.includes(value._id)) {
                        valuesSet.add(value._id);
                    }
                });
            });
            filterValues[attribute._id] = [...valuesSet] as string[]; // Explicitly cast values to string[]
        });

        // console.log('Values', filterValues)

        return filterValues;
    };

    const compatibleAttributeValues = getCompatibleAttributeValues();

    // console.log('compatibleAttributeValues', compatibleAttributeValues)

    const saveVariant = (selectedValue: any) => {
        // Tìm variant khớp với tất cả các thuộc tính đã chọn
        const matchedVariant = data?.variants.find((variant: any) => {

            if (Object.keys(selectedValue).length !== variant.values.length) return;

            // Kiểm tra xem variant có chứa tất cả các thuộc tính đã chọn không
            return Object.keys(selectedValue).every((attributeId) => {
                return variant.values.some((value: any) => value._id === selectedValue[attributeId]);
            });
        });

        if (matchedVariant) {
            onChangeVariant({
                productId: idProduct,
                variantId: idVariant,
                newVariantId: matchedVariant._id
            })
            // console.log("Đã tìm thấy _id", matchedVariant);
        } else {
            console.log("Không tìm được _id Variant");
        }
    };

    if (isLoading) return <div>Is Loading</div>
    if (isError) return <div>Is Error</div>
    return (
        <>
            <div
                className="flex items-center gap-1 px-2 py-1 border rounded-md cursor-pointer max-sm:text-[14px]"
                onClick={() => attribute !== idCart ? changeAttribute(idCart) : changeAttribute('1')}
            >
                {/* <div>
                    <p>{size}</p>
                </div> */}
                {/* <div className="bg-[#C3D2CC] px-1.5 max-sm:px-1 h-[2px]"></div> */}
                {/* <div className={`w-4 max-sm:w-3 h-4 max-sm:h-3 rounded-full`} style={{ backgroundColor: color || undefined }}></div> */}
                {str?.join(', ')}
                <div className={`transition-all duration-500 ${attribute === idCart ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                        <path fill="black" d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z" />
                    </svg>
                </div>
            </div>
            <div
                className={`absolute bg-background py-3 px-4 left-1/2 max-sm:left-[50%] -translate-x-1/2 border-2 border-border1 rounded-md transition-all duration-500 select-none 
                ${attribute === idCart ? 'opacity-100 top-[130%] z-10' : 'opacity-0 top-[90%] z-[-1]'}`}
            >
                {variantProduct?.map((item: any) => {
                    if (item.values.length < 1) return;
                    return (
                        <div key={item._id} className="flex flex-col gap-2 mb-2">
                            <h1 className="font-medium">Select {item.name}</h1>
                            <div className="flex gap-2">
                                {item.values.map((itemOther: any) => (
                                    <div
                                        key={itemOther._id}
                                        className={`relative border-2 px-5 py-4 rounded-md 
                                            ${!compatibleAttributeValues[item._id]?.includes(itemOther._id) ? 'opacity-50 cursor-not-allowed' : 'hover:border-background1 cursor-pointer transition-all'} 
                                            ${selectedValue[item._id]?.includes(itemOther._id) ? 'border-background1' : ''}`}

                                        onClick={() => {
                                            if (compatibleAttributeValues[item._id]?.includes(itemOther._id)) {
                                                handleAttributeChange(item._id, itemOther._id);
                                            }
                                        }}
                                    >
                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] font-medium">
                                            {itemOther.name}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    )
                })}

                <div className="flex justify-between space-x-4">
                    <div className="p-1 hover:text-red-500 cursor-pointer" onClick={() => changeAttribute('1')}>Cancel</div>
                    <button
                        onClick={() => saveVariant(selectedValue)}
                        className="py-1 px-3 bg-background border border-background1 text-background1 rounded-sm hover:bg-background1 hover:text-background transition-all duration-300"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default SizeColorSelector;