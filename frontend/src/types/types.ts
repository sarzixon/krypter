export type ShowErrorProps = {
    showError: React.Dispatch<React.SetStateAction<{
        show: boolean;
        message: string;
    }>>
}
export type Role = 'ADMIN' | 'BASIC'

export type Profile = {
    active: boolean,
    email: string,
    role: Role
}