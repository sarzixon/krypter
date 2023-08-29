import styled from "@emotion/styled";
import { Button } from "./Button";

export const SecondaryButton = styled(Button)`
     padding: .5rem 1rem;
     border: 3px solid ${({ theme }) => theme.palette.secondary.main};
     border-radius: ${({ theme }) => theme.shape.borderRadius}px;
     color: #fff;
  `;