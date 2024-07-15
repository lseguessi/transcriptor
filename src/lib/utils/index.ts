export function truncate(str: string, n: number) {
    return (str?.length > n) ? str.slice(0, n - 1) + '...' : str;
};

export const getGenericErrorMsg = () => {
    return "Ocorreu um erro inesperado, tente novamente mais tarde!"
}