import {Box, Button, Container, Divider, TextField, Typography, useTheme} from "@mui/material";
import styled from "@emotion/styled";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from "react";
import axios from "axios";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

const Wrapper = styled(Container)`
      height: 100vh;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: ${({theme}) => theme.palette.secondary.main};
    `;

const StyledBox = styled(Box)`
    background: ${({theme}) => theme.palette.background.default};
    box-shadow: 0px 11px 32px -5px rgba(66, 68, 90, 0.8);
    display: flex;
    flex-direction: column;
    padding: 6rem 8rem;
    border: 3px solid ${({theme}) => theme.palette.primary.main};
    border-radius: ${({theme}) => theme.shape.borderRadius}px;
  `;

const StyledHeader = styled(Typography)`
    margin-bottom: 1rem;
    font-family: ${({theme}) => theme.typography.fontFamily};
    font-size: ${({theme}) => theme.typography.h1.fontSize};
    
  `.withComponent('h1');

const StyledIcon = styled(AccountBoxIcon)`
    align-self: center;
    width: auto;
    height: auto;
    max-width: 100px;
    max-height: 100px;
    margin-bottom: 1rem;
    & > path {
      color: ${({theme}) => theme.palette.primary.main};
    }
  `;

const StyledButton = styled(Button)`
    margin: 1rem 0;
     border: 3px solid ${({theme}) => theme.palette.primary.main};
     border-radius: ${({theme}) => theme.shape.borderRadius}px;
  `;

type LogInInputs = {
	mail: string,
	password: string
}

export const LogInPage = () => {
	const theme = useTheme();

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
				pwd: data.password
			});

			console.log(data)

		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Wrapper>
			<StyledBox>
				<StyledHeader>Welcome</StyledHeader>
				<StyledIcon />
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
				<StyledButton onClick={handleSubmit(onSubmit)}>Log in</StyledButton>
				<Typography variant={"subtitle1"} css={css({
					textAlign: 'center',
					color:  theme.palette.text.disabled
				})}>or</Typography>
				<Divider />
				<Typography
					variant={"subtitle1"}
					component="a"
					alignSelf={"center"}
					css={css({
						marginTop: "1rem"
					})}
				>Register</Typography>
			</StyledBox>
		</Wrapper>
	)
}