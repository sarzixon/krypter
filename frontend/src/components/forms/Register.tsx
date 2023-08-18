import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Box, Checkbox, FormControlLabel, TextField} from "@mui/material";
/** @jsxImportSource @emotion/react */
import {StyledButton} from "../../pages/AuthPage/styles";
import React, {useState} from "react";
import axios from "axios";
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";


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
export const Register = () => {

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<RegisterInputs>( {defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            policy: false
        }});
    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/register', {
                email: data.email,
                password: data.password,
                policy: data.policy
            });

            //after successful registration save jwt token and redirect to dashboard

            // navigate('/dashboard');
            

        } catch (e) {
            setError(e.response.data.message)
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
                render={({field}) => <TextField
                    error={errors.email && true}
                    variant="standard"
                    type="email"
                    label="email"
                    css={css({marginBottom: "1rem"})}
                    {...field}
                />
                }
            />
            <Controller
                name="password"
                control={control}
                rules={{required: true, minLength: 8}}
                render={({field}) => <TextField
                    error={errors.password && true}
                    variant="standard"
                    type="password"
                    label="password"
                    css={css({marginBottom: "1rem"})}
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
                render={({field}) => <TextField
                    error={errors.confirmPassword && true}
                    variant="standard"
                    type="password"
                    label="confirm password"
                    css={css({marginBottom: "1rem"})}
                    {...field}
                />
                }
            />
            <Controller
                name="policy"
                control={control}
                rules={{required: true}}
                render={({field}) => <FormControlLabel
                    required
                    control={<Checkbox
                        {...field}
                    />}
                    label="I accept the privacy policy"
                    />
                }
            />
            <StyledButton type={"submit"}>Register</StyledButton>
            {error ?? error }
        </StyledForm>
    );
};