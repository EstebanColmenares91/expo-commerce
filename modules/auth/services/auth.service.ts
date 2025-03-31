import { LoginFormValues } from "../models/auth.model";

export async function login (data: LoginFormValues): Promise<Response> {
    return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}