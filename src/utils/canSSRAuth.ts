import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokensError } from "../service/errors/AuthTokensError";

//FUNÇÃO PARA PAGINAS QUE SÓ PODEM SER ACESSADAS POR USUARIOS LOGADOS.
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
        const cookies = parseCookies(context);

        const token = cookies['@pizzapp.token']

        if(!token){
            return {
                redirect:{
                    destination: "/",
                    permanent: false,
                }
            }
        }

        try{
            return await fn(context)
        }catch(error){
            if(error instanceof AuthTokensError){
                destroyCookie(context, '@pizzapp.token')

                return{
                    redirect:{
                        destination: "/",
                        permanent: false
                    }
                }
            }
        }
    }
}