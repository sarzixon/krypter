import {Control, Controller, SubmitHandler, useForm} from "react-hook-form";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { Button } from "../buttons/Button";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ShowErrorProps } from "../../types/types";
import TextFieldInput from "./TextFieldInput/TextFieldInput";


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

            await axios.post(import.meta.env.VITE_API_URL + '/auth/register', {
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
                    minLength: 8
                }}
                error={errors.email && true}
            />
            <TextFieldInput
                name="confirmPassword"
                control={(control as unknown) as Control}
                type="password"
                variant="standard"
                label="password"
                rules={{
                    required: true,
                    minLength: 8,
                    validate: value => getValues('password') === value
                }}
                error={errors.email && true}
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