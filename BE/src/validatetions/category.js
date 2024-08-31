import joi from "joi";
export const addcateValid = joi.object({
    name: joi.string().required().min(5).max(50).messages({
        'string.empty': 'name không được để trống',
        'any.required': 'name là bắt buộc',
        'string.min': 'name phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'name phải có độ dài tối đa là {#limit} ký tự',
    }),
    slug: joi.string().required().min(2).max(255).messages({
        'string.empty': 'slug không được để trống',
        'any.required': 'slug là bắt buộc',
        'string.min': 'slug phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'slug phải có độ dài tối đa là {#limit} ký tự',
    }),
    products: joi.string().optional().messages({
        'string.empty': 'products không được để trống',
        'any.required': 'products là bắt buộc',
    })
});


export const updatecateValid = joi.object({
    name: joi.string().required().min(5).max(50).optional().messages({
        'string.empty': 'name không được để trống',
        'any.required': 'name là bắt buộc',
        'string.min': 'name phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'name phải có độ dài tối đa là {#limit} ký tự',
    }),
    slug: joi.string().required().min(2).max(255).optional().messages({
        'string.empty': 'slug không được để trống',
        'any.required': 'slug là bắt buộc',
        'string.min': 'slug phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'slug phải có độ dài tối đa là {#limit} ký tự',
    }),
    products: joi.string().required().min(5).max(255).optional().messages({
        'string.empty': 'products không được để trống',
        'any.required': 'products là bắt buộc',
    })
});