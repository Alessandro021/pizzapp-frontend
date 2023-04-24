import { useState, FormEvent} from "react";
import { Header } from "../../components/Header";
import Head from "next/head";
import styles  from "./styles.module.scss"

import { setupAPIClient } from "../../service/api";
import { toast } from "react-toastify";

import {canSSRAuth} from '../../utils/canSSRAuth'

export default function Category(){

    const [name, setName] = useState("");

    async function  handleRegister(event: FormEvent) {
        event.preventDefault();
        if( name === ''){
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post("/category", {
            name: name
        })

        toast.success(`Categoria ${name} cadastrada com sucesso!`)
        setName("")
    }

    return(
        <>
        <Head>
            <title>Nova Categoria - PizzApp</title>
        </Head>

        <div>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                    
                    <input className={styles.input}
                    type="text"
                    placeholder="Digite o nome da categoria do produto"
                    value={name}
                    onChange={ texto => setName(texto.target.value)}
                    />

                    <button className={styles.button} type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context)=> {

        return {
            props: {}
        }
})