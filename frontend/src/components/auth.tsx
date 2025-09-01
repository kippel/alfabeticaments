import { useSession } from "next-auth/react"


export const useAuth = () => {
    
    const { data: session } = useSession();

    return { data : session  }
}

/*
export const backendUrl = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    return { backendUrl: backendUrl}
}
*/