import { useRouter } from "next/router";
import nextCookie from 'next-cookies';
import { getTokenCookie } from "@/lib/services/storage/app-storage";
import { UnauthorizedError } from "@/lib/services/exceptions/UnauthorizedError";


const withAuth = <P extends Record<string, unknown>>(
    Component: React.ComponentType<P>): React.FC<P> => {
    const Auth: React.FC<P> = (props) => {
        const router = useRouter();
        // const token = nextCookie(props)?.accessToken || null//getTokenCookie();
        // const nextCookies = cookies();

        const token = nextCookie(props)?.accessToke
        console.log("token ==>", token)
        console.log("props ==>", props)

        if (token == null || token == undefined || token == "") {
            console.log("token is null ", token)

            setTimeout(() => {


                if (typeof window === 'undefined') {
                    return;
                };
                // router.push('/login');
                // window.location.replace('/login');

            }, 1000)
            // return <FullLoading {...props} />
        } else {

        }
        return <Component {...props} />;




    }

    return Auth;
};

export default withAuth;


export const checkSession = () => {
    try {
        const token = getTokenCookie();
        if (!token) {
            throw new UnauthorizedError("Unauthorized access", 401);
        }
        return true;
    } catch (error) {
        console.log(error);
    }

}

