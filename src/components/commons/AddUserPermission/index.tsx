import { Box, Paper, TextField, Typography, Button, styled, IconButton, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox, CircularProgress } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

import { IUserPermissionsProcess } from "@/lib/types/IUserPermissionsProcess";
import { TextFieldWrapper } from "../TextFieldWrapper/TextFieldWrapper";
import { useState } from "react";
import { useAppStore } from "@/lib/store/appStore";
import SnackbarFeedback from "../SnackBar";

type FormTranscriptionProps = {
    values: IUserPermissionsProcess | null,
    isLoading?: boolean
}


export const AddUserPermission = ({ values, isLoading }: FormTranscriptionProps) => {
    const [newEmail, setNewEmail] = useState<string>("");

    const { usersProcessPermissions, errorMsg, setIsLoading, setUSerPermission } = useAppStore();
    const selected = usersProcessPermissions?.userPermissions || [];

    const handleClick = (userTemp: IUserResponse) => {
        if (!selected) return;
        const user: IUserResponse = userTemp;
        const lisCleaned = selected.filter((v => v.user !== userTemp.user));
        user.hasPermission = !userTemp.hasPermission
        lisCleaned.push(user)

        setUSerPermission({
            processNumber: usersProcessPermissions?.processNumber,
            userPermissions: lisCleaned || []
        } as IUserPermissionsProcess);
    };
    const isSelected = (user: IUserResponse) => user.hasPermission;

    const onAddUser = () => {

        if (!!newEmail && newEmail !== "") {
            selected.push({
                user: newEmail,
                hasPermission: true
            } as IUserResponse)
            setUSerPermission({
                processNumber: usersProcessPermissions?.processNumber,
                userPermissions: selected || []
            } as IUserPermissionsProcess);
        }
    }

    return (
        <Paper>
            <Box my={2}
                display="flex"
                alignItems="center"
                gap={4}
                py={4}
                px={8}

                sx={{}}>
                <div className="container mx-auto ">
                    <div className="mb-1 flex flex-col gap-4 ">
                        <Box my={2}
                            display="flex"
                            flexDirection={"row"}
                            alignItems="center"
                            gap={4}
                        >
                            <TextFieldWrapper
                                id="outlined-password-input"
                                label="email"
                                type="email"
                                value={values?.processNumber}
                                onChange={(v: any) => setNewEmail(v.target.value)}
                                sx={{ width: "100%" }}
                            />
                            <IconButton aria-label="add" color={"info"} onClick={onAddUser} sx={{ backgroundColor: '#221FF023' }} >
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 150 }}
                                    aria-labelledby="tableTitle"
                                    size={'medium'}
                                >

                                    <TableBody>
                                        {usersProcessPermissions?.userPermissions?.map((row, index) => {
                                            const isItemSelected = isSelected(row);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    onClick={(event) => handleClick(row)}
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.user}
                                                    selected={isItemSelected}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            onClick={(event) => handleClick(row)}
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.user}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                                {isLoading &&
                                    <div className="flex flex-col justify-content content-center items-center" style={{ marginTop: 50, marginBottom: 50, height: 50 }}>
                                        Enviando...
                                        <br />
                                        <br />
                                        <CircularProgress color="info" />
                                    </div>
                                }
                            </TableContainer>
                        </Box>
                    </div>
                </div>
            </Box>
            <SnackbarFeedback message={errorMsg || null} show={!!errorMsg} isError={true} vertical="bottom" variant="filled" />
        </Paper>
    )

}
