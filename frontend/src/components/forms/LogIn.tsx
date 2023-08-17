import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Box, TextField} from "@mui/material";
/** @jsxImportSource @emotion/react */
import {StyledButton} from "../../pages/AuthPage/styles";
import React from "react";
import axios from "axios";
import {css} from "@emotion/react";
import styled from "@emotion/styled";


const StyledForm = styled(Box)`
  display: flex;
  flex-direction: column;
`;

type LogInInputs = {
    mail: string,
    password: string
}
export const LogIn = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LogInInputs>( {defaultValues: {
            mail: '',
            password: ''
        }})
    const onSubmit: SubmitHandler<LogInInputs> = async (data) => {
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
                email: data.mail,
                password: data.password
            });

            console.log(data)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <StyledForm component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="mail"
                control={control}
                rules={{
                    required: true,
                    pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i
                }}
                render={({field}) => <TextField
                    error={errors.mail && true}
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
                rules={{required: true}}
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
            <StyledButton type={"submit"}>Log in</StyledButton>
        </StyledForm>
    );
};