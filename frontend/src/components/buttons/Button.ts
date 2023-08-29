import { Button as MuiButton, styled } from "@mui/material";

export const Button = styled(MuiButton)`
    margin: 1rem 0;
     border: 3px solid ${({ theme }) => theme.palette.primary.main};
     border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  `;