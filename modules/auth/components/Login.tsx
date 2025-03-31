import { Button } from "core/components/Button";
import { Input } from "core/components/Input";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { LoginFormValues } from "../models/auth.model";
import { login } from "../services/auth.service";


export function Login() {
    const { control, handleSubmit } = useForm<LoginFormValues>({
        defaultValues: {
            email: "john@mail.com",
            password: "changeme",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        console.log(data);
        const { email, password } = data;
        const { status } = await login({ email, password });
        if (status === 200) {
            console.log("Login successful!");
        } else {
            console.log("Login failed!");
        }
    };

    return (
        <View>
            <Input control={control} name="email"    label="Email"    />
            <Input control={control} name="password" label="Password" />
            <Button onPress={handleSubmit(onSubmit)}>
                <Text>Login</Text>
            </Button>
        </View>
    )
}