import {Divider, Link, Typography, useTheme} from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, {useState} from "react";
import {StyledBox, StyledHeader, StyledIcon, Wrapper} from "./styles";
import {LogIn} from "../../components/forms/LogIn";
import {Register} from "../../components/forms/Register";



export const AuthPage = () => {
	const theme = useTheme();
	const [isLogin, setIsLogin] = useState(true)

	const handleFormChange = (e:React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setIsLogin(!isLogin);
	}

	return (
		<Wrapper>
			<StyledBox>
				<StyledHeader>Welcome</StyledHeader>
				<StyledIcon />
				{isLogin ? <LogIn /> : <Register />}
				<Typography variant={"subtitle1"} css={css({
					textAlign: 'center',
					color:  theme.palette.text.disabled
				})}>or</Typography>
				<Divider />
				<Link
					variant={"subtitle1"}
					component="a"
					alignSelf={"center"}
					css={css({
						marginTop: "1rem"
					})}
					onClick={handleFormChange}
				>{isLogin ? "Log in" : "Register"}</Link>
			</StyledBox>
		</Wrapper>
	)
}