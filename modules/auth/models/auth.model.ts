export interface LoginFormValues {
    email: string;
    password: string;
}

export interface RegisterFormValues extends LoginFormValues {
    name: string,
    avatar ?: string
}