import { fetcher } from "core/utils/fetcher";
import { LoginFormValues, RegisterFormValues } from "../models/auth.model";
import { setAuthKey } from "./token.service";
import { User } from "core/models/user.model";

interface LoginResponse {
    access_token  : string;
    refresh_token : string;
}

interface isEmailAvaible {
    isAvailable: boolean
}

interface RegisterResponse {
    email: string;
    password: string;
    name: string;
    avatar: string;
    role: string;
    id: number;
}

export async function login(body: LoginFormValues): Promise<void> {
    try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if(res.status !== 201) {
            throw new Error('Hubo un error al iniciar sesión. Por favor intente más tarde.')
        }

        const data: LoginResponse = await res.json()
        return setAuthKey(data.access_token)
    } catch (error) {
        if(error?.message) throw new Error(error)
    }
}

export async function emailAvailability(data: { email: string }): Promise<isEmailAvaible> {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/users/is-available`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return await res.json()
}

export async function register(data: RegisterFormValues) {
    const { status } = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    console.log(status);
    

    if(status === 201) {
        const { email, password } = data
        await login({ email, password })
    }
}

export async function getProfile(): Promise<User> {
    return await fetcher<User>(`https://api.escuelajs.co/api/v1/auth/profile`)
}