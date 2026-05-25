import { z } from 'zod';

export const LoginUserDtoSchema = z.object({
  email: z
    .string()
    .min(1, 'Введите ваш псевдоним или email')
    .refine((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || value.length > 0;
    }, 'Введите действительный псевдоним или email'),
  password: z.string().min(6, 'Пароль должен состоять минимум из 6 символов'),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  birthdate: z.date(),
  password: z.string().min(6, 'Пароль должен состоять минимум из 6 символов'),
  rePassword: z.string().min(6, 'Пароль должен состоять минимум из 6 символов'),
});

export const editUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  birthdate: z.date(),
});

export const ActivationData = z.object({
  uid: z.string(),
  token: z.string(),
});

export const UpdatePassword = z.object({
  uid: z.string(),
  token: z.string(),
  newPassword: z
    .string()
    .min(6, 'Пароль должен состоять минимум из 6 символов'),
  confirmPassword: z.string(),
});

export const TokensDtoSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

export const SendEmail = z.object({
  email: z
    .string()
    .email('Введите действительный  email')
    .min(1, 'Введите ваш  email'),
});

export const UserDtoSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  birthdate: z.date(),
  lastName: z.string(),
  photo: z.string(),
});
