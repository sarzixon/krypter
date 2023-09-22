import { styled } from '@mui/material/styles'
import { Box } from '@mui/system';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Logo = styled('h1')`
    margin: 1rem .5rem;
    color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    gap: 1rem;
    `;

export const AppLogo = () => {
    const location = useLocation();



    return (
        <Wrapper>
            <StyledLink to="/dashboard">
                <Logo>Krypter</Logo>
            </StyledLink>
            <NavLink to={location.pathname}>{location.pathname}</NavLink>
        </Wrapper>
    )
}