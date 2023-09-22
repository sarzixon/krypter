import {Alert, Divider, Link, Typography} from "@mui/material";
import { StyledBox, StyledHeader, StyledIcon, Wrapper } from "./styles";
import { LogIn } from "../../components/forms/LogIn";
import { Register } from "../../components/forms/Register";
import { Link as RouterLink, useLocation, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import {styled} from "@mui/material/styles";

const StyledAlert = styled(Alert)`
	width: 90%;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 20px;
`;

const StyledTxt = styled(Typography)`
	textAlign: 'center';
	color: ${({theme}) => theme.palette.text.disabled}
` as typeof Typography<'span'>;

export const AuthPage = () => {
	const location = useLocation();
	const isRegister = Boolean(useMatch('/auth/register'));
	const [alertState, setAlertState] = useState({
		show: false,
		message: ''
	});

	useEffect(() => {
		setAlertState(prev => {
			return {
				...prev,
				show: false
			}
		})
	}, [location]);

	return (
		<Wrapper>
			<StyledBox>
				<StyledHeader>Welcome</StyledHeader>
				<StyledIcon />
				{isRegister ? <Register showError={setAlertState} /> : <LogIn showError={setAlertState} />}

				<StyledTxt variant={"subtitle1"} component={"span"}>or</StyledTxt>
				<Divider />
				<Link
					variant={"subtitle1"}
					component={RouterLink}
					alignSelf={"center"}
					to={isRegister ? "/auth/login" : "/auth/register"}
				>{isRegister ? "Log in" : "Register"}</Link>
				{alertState.show && <StyledAlert severity="error">{alertState.message}</StyledAlert>}
			</StyledBox>
		</Wrapper>
	)
}