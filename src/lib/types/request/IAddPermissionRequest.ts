export interface IAddPermissionRequest {
    userPermissions: IUserRequest[] | []
    process_number: string | null;
}
interface IUserRequest {
    user: string,
    hasPermission: boolean
}