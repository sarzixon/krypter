import { Box, Container, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {styled} from "@mui/material/styles";
/** @jsxImportSource @emotion/react */

export const Wrapper = styled(Container)`
      height: 100vh;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `;

export const StyledBox = styled(Box)`
    position: relative;
    background: ${({ theme }) => theme.palette.background.default};
    display: flex;
    flex-direction: column;
    padding: 6rem 8rem;
    border: 3px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  `;

export const StyledHeader = styled(Typography)`
    margin-bottom: 1rem;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
    
  `.withComponent('h1');

export const StyledIcon = styled(AccountBoxIcon)`
    align-self: center;
    width: auto;
    height: auto;
    max-width: 100px;
    max-height: 100px;
    margin-bottom: 1rem;
    & > path {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  `;