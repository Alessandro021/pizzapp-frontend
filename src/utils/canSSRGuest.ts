import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

//FUNÇÃO PARA PAGINAS QUE SÓ PODEM SER ACESSADAS POR VISITANTES.
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
    
        
        const cookies = parseCookies(context);

        //SE O USUARIO TENTAR ACESSAR A PAGINA POREM TENDO JA UM LOGIN SALVO, REDIRECIONAMOS.
        if(cookies['@pizzapp.token']){
            return {
                redirect:{
                    destination: "/dashboard",
                    permanent: false,
                }
            }
        }

        return await fn(context)
    }
}
