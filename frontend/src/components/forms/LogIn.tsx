import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, TextField } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { Button } from "../../components/buttons/Button";
import axios from "axios";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const StyledForm = styled(Box)`
  display: flex;
  flex-direction: column;
`;

type LogInInputs = {
    email: string,
    password: string
}
export const LogIn = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LogInInputs>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit: SubmitHandler<LogInInputs> = async (data) => {
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
                email: data.email,
                password: data.password
            }, {
                withCredentials: true,

            });

            localStorage.setItem('uid', res.data.uid)
            navigate('/dashboard')

        } catch (e) {
            console.log(e)
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
            <Button type={"submit"}>Log in</Button>
        </StyledForm>
    );
};