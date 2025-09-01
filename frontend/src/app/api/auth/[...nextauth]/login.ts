import axios from "axios";

interface TokenUser {
  id: number;
  username: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  user: TokenUser;
}

export async function login(username: string, password: string): Promise<TokenResponse | null> {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    const res = await axios.post<TokenResponse>(`${backendUrl}/auth/token`, formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    
    return res.data; // { access_token, token_type, user }
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
}