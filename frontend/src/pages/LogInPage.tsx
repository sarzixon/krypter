import {Box, Button, Container, Divider, TextField, Typography, useTheme} from "@mui/material";
import styled from "@emotion/styled";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, {useState} from "react";


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

export const LogInPage = () => {
	const theme = useTheme();
	const [formData, setFormData] = useState({
		login: {
			value: '',
			error: false,
		},
		pwd: {
			value: '',
			error: false
		},
	})

	const validateInputs = (): boolean => {
		if (formData.login.value.length < 1) {
			setFormData(prevState => {
				const res = {...prevState};
				res.login.error = true
				return res;
			})

		}

		if (formData.pwd.value.length < 1) {
			setFormData(prevState => {
				const res = {...prevState};
				res.pwd.error = true
				return res;
			})
		}

		//find inputs with error == true
		return ( !(formData.login.error || formData.pwd.error) );

	}
	const handleLoginSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if( validateInputs() ) {
			fetch('http://localhost:8000/login', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					login: formData.login.value,
					pwd: formData.pwd.value
				})
			})
				.then(res => res.text())
				.then(body => console.log(body))
				.catch(err => console.log(err) )
		}
	}

	return (
		<Wrapper>
			<StyledBox>
				<StyledHeader>Welcome</StyledHeader>
				<StyledIcon />
				<TextField
					error={formData.login.error ?? true}
					variant="standard"
					label={"login"}
					css={css({marginBottom: "1rem"})}
					value={formData.login.value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prevState => {
						const res = {...prevState};
						res.login.value = e.target.value;
						return res;
					})}
					onFocus={e => setFormData(prevState => {
						const res = {...prevState};
						res.login.error = false;
						return res;
					})}
				/>
				<TextField
					error={formData.pwd.error ?? true}
					variant="standard"
					type="password"
					label={"password"}
					css={css({marginBottom: "1rem"})}
					value={formData.pwd.value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prevState => {
						const res = {...prevState};
						res.pwd.value = e.target.value;
						return res;
					})}
					onFocus={e => setFormData(prevState => {
						const res = {...prevState};
						res.pwd.error = false;
						return res;
					})}
				/>
				<StyledButton onClick={handleLoginSubmit}>Log in</StyledButton>
				<Typography variant={"subtitle1"} css={css({
					textAlign: 'center',
					color:  theme.palette.text.disabled
				})}>or</Typography>
				<Divider />
				<StyledButton>Register</StyledButton>
			</StyledBox>
		</Wrapper>
	)
}