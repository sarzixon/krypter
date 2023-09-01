import { ReactNode, createContext, useEffect, useState } from "react";
import { Profile } from "../types/types";
import axios from "axios";

type ContextProviderProps = {
    children: ReactNode
}

export const ProfileContext = createContext<Profile | null>(null);

export function ProfileContextProvider({ children }: ContextProviderProps) {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {

        async function fetchContext() {
            const res = await axios.get<Profile>(import.meta.env.VITE_API_URL + '/users/me')
            setProfile(res.data);
        }

        fetchContext()

    }, []);

    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    );

}

