import { createContext, ReactNode, useState, useEffect } from "react";

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from "next/router";
import { api } from "../service/apiClient";

import { toast } from "react-toastify";
 
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

    useEffect(() => {
        //TENTAR PEGAR ALGO NO COOKIE
        const {'@pizzapp.token': token } =parseCookies();

        if(token){
            api.get("/me").then(response => {
                const { id, name, email} = response.data;
                setUser({
                    id, name, email,
                })
            })
            .catch(error => {
                //SE DEU ERRO ENTÃO O USUARIO SERA DESLOGADO
                signOut();
            })
        }

    },[])

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

            toast.success(`Olá ${name}, seja bem vindo(a)!`)


            //REDIRECIONAR O USUARIO PARA /dashboard
            Router.push('/dashboard')

       } catch (error) {
            toast.error("Error ao acessar")
            console.log(error)
       }
    }

    async function signUp({name, email, password}: SignUpProps){
        
        try {

            const response = await api.post("/users", {
                name,
                email,
                password,
            })

            toast.success(`Olá ${name}, sua conta foi criada com sucesso!`)


            Router.push("/")
            
        } catch (error) {
            toast.error("Erro ao cadastrar.")
            console.log("Erro ao cadastrar ", error)
        }

    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}