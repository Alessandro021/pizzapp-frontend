import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";

import { AuthTokensError } from "./errors/AuthTokensError";
import { signOut } from "../contexts/AuthContext";


export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3001',
        headers:{
            Authorization: `Bearer ${cookies['@pizzapp.token']}`
        }
    })

    api.interceptors.response.use(response =>{
        return response;
    },(error: AxiosError) => {
        if(error.response.status === 401){
            //QUALQUER ERRO 401 DEVE DESLOGAR O USUARIO
            if(typeof window !== undefined){
                //CHAMAR A FUNÇÂO DE DESLOGAR O USUARIO
                signOut();
            }else{
                return Promise.reject(new AuthTokensError())
            }
        }

        return Promise.reject(error)
    })

    return api;
}
