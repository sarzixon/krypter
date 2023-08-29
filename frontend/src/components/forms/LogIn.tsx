import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import { Button } from "../../components/buttons/Button";
import axios, { AxiosError } from "axios";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ShowErrorProps } from "../../types/types";
import { useEffect } from "react";

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
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
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
            <Controller
                name="email"
                control={control}
                rules={{
                    required: true,
                    pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i
                }}
                render={({ field }) => <TextField
                    error={errors.email && true}
                    variant="standard"
                    type="email"
                    label="email"
                    css={css({ marginBottom: "1rem" })}
                    {...field}
                />
                }
            />
            <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField
                    error={errors.password && true}
                    variant="standard"
                    type="password"
                    label="password"
                    css={css({ marginBottom: "1rem" })}
                    {...field}
                />
                }
            />
            <Button disabled={isSubmitting} type={"submit"}>Log in</Button>
        </StyledForm>
    );
};