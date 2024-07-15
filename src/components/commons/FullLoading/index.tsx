import CircularProgress from '@mui/material/CircularProgress';

const FullLoading = () => {
    return (
        <div className="w-screen  h-screen flex flex-row justify-center content-center items-center">
            <CircularProgress />
        </div>
    )

}

export default FullLoading;