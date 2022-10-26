import {Joi} from 'express-validation';

export const RegisterValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirm_password: Joi.string().required()


});