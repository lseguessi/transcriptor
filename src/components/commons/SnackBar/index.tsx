import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import { Alert, Box, Slide, SlideProps } from '@mui/material';

type SnackbrProps = {
    isError?: boolean
    message: string | null,
    show: boolean,
    vertical?: "top" | "bottom"
    horizontal?: "center" | "right" | "left"
    variant?: "outlined" | "filled" | "standard"
}
export default function SnackbarFeedback({ isError, message, show, horizontal, vertical, variant }: SnackbrProps) {
    const [open, setOpen] = React.useState(false);
    const nodeRef = React.useRef(null);

    React.useEffect(() => {
        setOpen(show);

    }, [show, message]);
    const handleClose = (_: any, reason?: SnackbarCloseReason) => {
        setOpen(false);
    };

    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="left" />;
    }
    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical: vertical ? vertical : 'top', horizontal: horizontal ? horizontal : 'right' }}
                open={open}
                TransitionComponent={SlideTransition}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
                title={isError ? "Erro" : "Success"}
                key={message}
                ref={nodeRef}
            >
                <Alert
                    onClose={handleClose}
                    severity={isError ? "error" : "success"}
                    variant={variant ? variant : "outlined"}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

