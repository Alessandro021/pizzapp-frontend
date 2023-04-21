import { canSSRAuth } from "@/src/utils/canSSRAuth"

export default function Dashboard(){
    return(
        <div>
            <h1>Bem vindo ao Deshboard</h1>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    return{
        props:{}
    }
})