import {z} from 'zod';

const signupSchema = z.object({
    name: z.string({required_error: "Name is Required"})
                .min(3,{message: "Name must be at least 3 chars"})
                .max(255,{message: "Name must be at least of 3 chars"})
                .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only letters and spaces" }),
    email:    z.string({required_error: "Email is Required"})
                .email({message: "Invalid email address"}),
    password: z.string({required_error: "Password is Required"})
                .min(8,{message: "password must be at least of 8 characters"})
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                })
})

const loginSchema = z.object({
    email:    z.string({required_error: "Email is Required"})
                .email({message: "Invalid email address"}),
    password: z.string({required_error: "Password is Required"})
                .min(8,{message: "password must be at least of 6 characters"})
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                })
})

const passwordSchema = z.object({
    oldPassword: z.string({required_error: "Password is Required"})
    .min(8,{message: "password must be at least of 6 characters"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }),
    newPassword: z.string({required_error: "Password is Required"})
    .min(8,{message: "password must be at least of 6 characters"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    })
})

export {signupSchema,loginSchema,passwordSchema};