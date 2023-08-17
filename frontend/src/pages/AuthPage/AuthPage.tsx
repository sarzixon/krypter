import {Divider, Link, Typography, useTheme} from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from "react";
import {StyledBox, StyledHeader, StyledIcon, Wrapper} from "./styles";
import {LogIn} from "../../components/forms/LogIn";
import {Register} from "../../components/forms/Register";
import {Link as RouterLink, useMatch} from "react-router-dom";



export const AuthPage = () => {
	const theme = useTheme();
	//@ts-ignore
	const isRegister = Boolean( useMatch('/auth/register') );


	return (
		<Wrapper>
			<StyledBox>
				<StyledHeader>Welcome</StyledHeader>
				<StyledIcon />
				{isRegister ? <Register /> : <LogIn />}
				<Typography variant={"subtitle1"} css={css({
					textAlign: 'center',
					color:  theme.palette.text.disabled
				})}>or</Typography>
				<Divider />
				<Link
					variant={"subtitle1"}
					component={RouterLink}
					alignSelf={"center"}
					css={css({
						marginTop: "1rem"
					})}
					to={isRegister ? "/auth/login" : "/auth/register"}
				>{isRegister ? "Log in" : "Register"}</Link>
			</StyledBox>
		</Wrapper>
	)
}