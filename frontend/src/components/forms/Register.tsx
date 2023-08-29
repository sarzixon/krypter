import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { Button } from "../../components/buttons/Button";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ShowErrorProps } from "../../types/types";


const StyledForm = styled(Box)`
  display: flex;
  flex-direction: column;
`;

type RegisterInputs = {
    email: string,
    password: string,
    confirmPassword: string,
    policy: boolean
}

type RegisterProps = ShowErrorProps;

export const Register = ({ showError }: RegisterProps) => {

    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<RegisterInputs>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            policy: false
        }
    });

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

    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        try {

            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/register', {
                email: data.email,
                password: data.password,
                policy: data.policy
            });

            navigate('/dashboard');


        } catch (e: unknown) {
            reset();
            const error = e as AxiosError<{ message: string }>;

            showError(() => {

                return {
                    show: true,
                    message: error.response?.data.message || 'Invalid data'
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
                rules={{ required: true, minLength: 8 }}
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
            <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    required: true,
                    minLength: 8,
                    validate: value => getValues('password') === value
                }}
                render={({ field }) => <TextField
                    error={errors.confirmPassword && true}
                    variant="standard"
                    type="password"
                    label="confirm password"
                    css={css({ marginBottom: "1rem" })}
                    {...field}
                />
                }
            />
            <Controller
                name="policy"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FormControlLabel
                    required
                    control={<Checkbox
                        {...field}
                    />}
                    label="I accept the privacy policy"
                />
                }
            />
            <Button disabled={isSubmitting} type={"submit"}>Register</Button>
        </StyledForm>
    );
};