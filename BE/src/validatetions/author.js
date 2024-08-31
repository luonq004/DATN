import joi from "joi";
export const signUpValidation = joi.object({
    username: joi.string().required().min(5).max(50).messages({
        'string.empty': 'Username không được để trống',
        'any.required': 'Username là bắt buộc',
        'string.min': 'Username phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'Username phải có độ dài tối đa là {#limit} ký tự',
    }),
    email: joi.string().required().email().messages({
        'string.empty': 'Email không được để trống',
        'any.required': 'Email là bắt buộc',
        'string.email': 'Email không đúng định dạng'
    }),
    password: joi.string().required().min(5).max(50).messages({
        'string.empty': 'Password không được để trống',
        'any.required': 'Password là bắt buộc',
        'string.min': 'Password phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'Password có độ dài tối đa là {#limit} ký tự',
    }),
    confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
        'string.empty': 'confirmPassword không được để trống',
        'any.only': 'confirmPassword không khớp với password',
    }),
        
});

export const signInValidation = joi.object({
    // username: joi.string().required().min(5).max(50).messages({
    //     'string.empty': 'Username không được để trống',
    //     'any.required': 'Username là bắt buộc',
    //     'string.min': 'Username phải có độ dài tối thiểu là {#limit} ký tự',
    //     'string.max': 'Username phải có độ dài tối đa là {#limit} ký tự',
    // }),
    email: joi.string().required().email().messages({
        'string.empty': 'Email không được để trống',
        'any.required': 'Email là bắt buộc',
        'string.email': 'Email không đúng định dạng'
    }),
    password: joi.string().required().min(5).max(50).messages({
        'string.empty': 'Password không được để trống',
        'any.required': 'Password là bắt buộc',
        'string.min': 'Password phải có độ dài tối thiểu là {#limit} ký tự',
        'string.max': 'Password phải có độ dài tối đa là {#limit} ký tự',
    })
});