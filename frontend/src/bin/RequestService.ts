import { AxiosError, AxiosResponse } from "axios";

type RequestWrapperType = <T>() => Promise<AxiosResponse<T>>
export async function RequestService<R>(callback: RequestWrapperType) {
    try {
        return await callback<R>();
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                console.log('UNAUTHORIZED !!!');

                window.location.href = '/auth';
            }
        }
    }

    return null;
}