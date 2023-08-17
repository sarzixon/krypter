import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Box, Checkbox, FormControlLabel, TextField} from "@mui/material";
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

type RegisterInputs = {
    mail: string,
    password: string,
    confirmPassword: string,
    policy: boolean
}
export const Register = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInputs>( {defaultValues: {
            mail: '',
            password: '',
            confirmPassword: '',
            policy: false
        }})
    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/register', {
                email: data.mail,
                password: data.password,
                confirmPassword: data.confirmPassword
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
            <Controller
                name="confirmPassword"
                control={control}
                rules={{required: true}}
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
                    control={<Checkbox
                        error={errors.policy && true}
                        {...field}
                    />}
                    label="I accept the privacy policy"
                    />
                }
            />
            <StyledButton type={"submit"}>Register</StyledButton>
        </StyledForm>
    );
};