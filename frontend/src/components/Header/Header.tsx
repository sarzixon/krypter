import { AppBar, Avatar, Box, Container } from "@mui/material";
import { AppLogo } from "../AppLogo/AppLogo";
import styled from "@emotion/styled";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderWrapper = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderProfile = styled(Box)`
display: flex;
align-items: center;
gap: 1rem;
`;

export function Header() {
    const navigate = useNavigate();

    function handleLogout() {
        axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, null, {
            withCredentials: true
        }).then(() => {
            navigate('/auth/login')

        }).catch((err) => {
            console.log("Error while Logging out");
        });
    }

    return (
        <AppBar position="sticky" sx={{ padding: '.5rem' }}>
            <HeaderWrapper>
                <AppLogo />
                <Box sx={{ display: "flex", gap: '1rem' }}>
                    <HeaderProfile>
                        <Avatar>M</Avatar>
                        Hello, Michal
                    </HeaderProfile>
                    <SecondaryButton onClick={handleLogout}>
                        Logout
                    </SecondaryButton>
                </Box>
            </HeaderWrapper>
        </AppBar>
    )
}
