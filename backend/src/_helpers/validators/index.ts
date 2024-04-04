import {z} from 'zod';

export const noteSchema = z.object({
    title: z.string({required_error: 'Title is Required'}),
    body: z.string({required_error: 'Body is Required'}),
});

export const loginSchema = z.object({
    email: z.string({required_error: 'Email is Required'}).email('Invalid Email Address'),
    password: z.string({required_error: 'Password is Required'}),
});


export const registerSchema = z.object({
    name: z.string({required_error: 'Name is Required'}).min(3),
    email: z.string({required_error: 'Email is Required'}).email('Invalid Email Address'),
    password: z.string({required_error: 'Password is Required'}).min(6),
});
 export const taskSchema = z.object({
    
    title:z.string({required_error:'Task is required'})
 })