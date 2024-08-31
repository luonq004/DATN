import joi from "joi";

export const addProvalid = joi.object({

    name: joi.string().required().min(5).max(255).messages({
        'string.empty': 'name không được để trống',
        'any.required': 'name là bắt buộc',
        'string.min': 'name phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'name phải có độ dài tối đa là {#limit} ký tự',
    }),
    image: joi.string().required().min(5).max(255).messages({
        'string.empty': 'image không được để trống',
        'any.required': 'image là bắt buộc',
        'string.min': 'image phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'image phải có độ dài tối đa là {#limit} ký tự',
    }),
    price: joi.number().required().min(2).messages({
        'string.empty': 'price không được để trống',
        'any.required': 'price là bắt buộc',
        'number.base': 'price phải là số',
        'string.min': 'price phải có độ dài tối thiểu là {#limit} ký tự'
    }),
    description: joi.string().required().min(5).max(255).messages({
        'string.empty': 'descriptions không được để trống',
        'any.required': 'descriptions là bắt buộc',
        'string.min': 'descriptions phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'descriptions phải có độ dài tối đa là {#limit} ký tự',
    }),
    categoryId: joi.string().min(5).max(255).optional()
});

export const updateProvalid = joi.object({

    name: joi.string().required().min(5).max(255).optional().messages({
        'string.empty': 'name không được để trống',
        'any.required': 'name là bắt buộc',
        'string.min': 'name phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'name phải có độ dài tối đa là {#limit} ký tự',
    }),
    image: joi.string().required().min(5).max(255).optional().messages({
        'string.empty': 'image không được để trống',
        'any.required': 'image là bắt buộc',
        'string.min': 'image phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'image phải có độ dài tối đa là {#limit} ký tự',
    }),
    price: joi.number().required().min(5).max(50).optional().messages({
        'string.empty': 'price không được để trống',
        'any.required': 'price là bắt buộc',
        'number.base': 'price phải là số',
        'string.min': 'price phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'price phải có độ dài tối đa là {#limit} ký tự',
    }),
    description: joi.string().required().min(5).optional().max(255).messages({
        'string.empty': 'descriptions không được để trống',
        'any.required': 'descriptions là bắt buộc',
        'string.min': 'descriptions phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'descriptions phải có độ dài tối đa là {#limit} ký tự',
    }),
    categoryId: joi.string().required().min(5).max(255).optional().messages({
        'string.empty': 'categoryId không được để trống',
        'any.required': 'categoryId là bắt buộc',
        'string.min': 'categoryId phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'categoryId phải có độ dài tối đa là {#limit} ký tự',
    })
});
