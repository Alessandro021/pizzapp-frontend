import { createContext, ReactNode, useState } from "react";

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from "next/router";
import { api } from "../service/apiClient";
 
type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export function signOut(){
    try {
        destroyCookie(undefined, '@pizzapp.token')
        Router.push("/")
    } catch (error) {
        console.log("Erro ao deslogar usuario.")
    }
}

export  const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps){

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user

    async function signIn({email, password}: SignInProps){
       try {
            const response = await api.post("/session", {
                email,
                password
            })

            // console.log(response.data)
            const {id, name, token} = response.data

            setCookie(undefined, '@pizzapp.token', token, {
                maxAge: 60 * 60 * 24 * 30, //O TOKEN EXPIRA EM 1 MES
                path: "/" //O COOKIE TEM ACESSO A TODOS OS CAMINHOS
            })

            setUser({
                id, name, email,
            })

            //PASSAR PARA AS PROXIMAS REQUISIÇOES O NOSSO TOKEN
            api.defaults.headers['Authorization'] = `Bearer ${token}`


            //REDIRECIONAR O USUARIO PARA /dashboard
            Router.push('/dashboard')

       } catch (error) {
            alert(error)
       }
    }

    async function signUp({name, email, password}: SignUpProps){
        
        try {

            const response = await api.post("/users", {
                name,
                email,
                password,
            })

            alert("Usuario cadastrado com sucesso!")

            Router.push("/")
            
        } catch (error) {
            console.log("Erro ao cadastrar ", error)
        }

    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}