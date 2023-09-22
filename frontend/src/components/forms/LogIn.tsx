import { SubmitHandler, useForm, Control } from "react-hook-form";
import { Box } from "@mui/material";
import { Button } from "../buttons/Button";
import axios, { AxiosError } from "axios";
import { styled } from '@mui/material/styles'
import { useNavigate } from "react-router-dom";
import { ShowErrorProps } from "../../types/types";
import { useEffect } from "react";
import TextFieldInput from "./TextFieldInput/TextFieldInput";

const StyledForm = styled(Box)`
  display: flex;
  flex-direction: column;
`;

type LogInInputs = {
    email: string,
    password: string
}

type LogInProps = ShowErrorProps

export const LogIn = ({ showError }: LogInProps) => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<LogInInputs>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    useEffect(() => {
        if (isDirty) {
            showError(prev => {
                return {
                    ...prev,
                    show: false
                }
            })
        }
    }, [isDirty]);

    const onSubmit: SubmitHandler<LogInInputs> = async (data) => {
        try {
            await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
                email: data.email,
                password: data.password
            }, {
                withCredentials: true,

            });

            navigate('/dashboard')

        } catch (e: unknown) {
            reset();

            const error = e as AxiosError<{ message: string }>;

            showError(() => {

                return {
                    show: true,
                    message: error.response?.data.message || 'Invalid credentials'
                }
            })
        }
    }

    return (
        <StyledForm component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <TextFieldInput
                name="email"
                control={(control as unknown) as Control}
                type="email"
                variant="standard"
                label="email"
                rules={{
                    required: true,
                    pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i
            }}
                error={errors.email && true}
            />
            <TextFieldInput
                name="password"
                control={(control as unknown) as Control}
                type="password"
                variant="standard"
                label="password"
                rules={{
                    required: true,
                }}
                error={errors.password && true}
            />

            <Button disabled={isSubmitting} type={"submit"}>Log in</Button>
        </StyledForm>
    );
};