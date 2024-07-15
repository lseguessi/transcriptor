import styled from "@emotion/styled";
import Button, { ButtonProps } from "@mui/material/Button";
import { red } from "@mui/material/colors";

export const WhiteRedButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: red[700],
    backgroundColor: '#ffffff',
    '&:hover': {
        backgroundColor: red[700],
        color: '#ffffff',
        borderColor: red[700],


    },
    borderColor: red[700],
}));

export const RedButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#ffffff',
    backgroundColor: red[700],
    '&:hover': {
        backgroundColor: '#ffffff',
        color: red[700],
        borderColor: '#ffffff',


    },
    borderColor: red[700],
}));