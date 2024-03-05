import { z } from 'zod';

// =-=-=-Schemas Users-=-=-= //

export const AuthUserFormSchema = z.object({
    email: z
        .string()
        .nonempty('O email é obrigatório.'),
    password: z
        .string()
        .nonempty('A senha é obrigatória.')
});

export const UserFormSchema = z.object({
    email: z
        .string()
        .nonempty('O email é obrigatório.'),
    password: z
        .string()
        .nonempty('A senha é obrigatória.'),
    status: z
        .boolean().optional(),
    confirmpassword: z
        .string()
        .nonempty('A confirmação de senha é obrigatória.')
}).refine((data) => data.password === data.confirmpassword, {
    message: 'As senhas não se coincidem',
    path: ['confirmpassword']
})

export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .nonempty('O email é obrigatório.')
});
