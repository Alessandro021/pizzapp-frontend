import { canSSRAuth } from "@/src/utils/canSSRAuth"
import Head from "next/head"

import { Header } from "../../components/Header"

export default function Dashboard(){
    return(
       <>
        <Head>
            <title>Painel - PizzApp</title>
        </Head>

        <div>
            <Header />
            <h1>Painel Dashboard</h1>
        </div>

       </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    return{
        props:{}
    }
})