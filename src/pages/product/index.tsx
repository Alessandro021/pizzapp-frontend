import { useState, ChangeEvent } from "react";

import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss'

import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload} from 'react-icons/fi'
import { TextArea } from "@/src/components/ui/Input";

import { setupAPIClient } from "../../service/api";

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[]
}

export default function Product({categoryList}: CategoryProps){

    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageAvatar, setImageAvatar] = useState(null);

    const [ categories ] = useState(categoryList || [])
    const [ categorySelect, setCategorySelect] = useState(0)

    function handleFile(event: ChangeEvent<HTMLInputElement>){

        if(!event.target.files){
            return;
        }

        const image = event.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(event.target.files[0]))
        }
    }

    //QUANDO É SELECIONADO UMA NOVA CATEGORIA NA LISTA
    function handleChangeCategory(event ){
        setCategorySelect(event.target.value)
    }
    return(
        <>
            <Head>
                <title>Novo Produto - PizzApp</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#FFF" />
                            </span>

                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
                            
                            {avatarUrl && (
                                <img className={styles.preview}
                                    src={avatarUrl}
                                    alt="Fotp do produto"
                                    width={250}
                                    height={250}
                                />
                            )}

                        </label>



                       <select value={categorySelect} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return(
                                <option key={item.id} value={index}>
                                {item.name}
                            </option>
                        )})}
                        </select>

                        <input className={styles.input}
                        type="text"
                        placeholder="Digite o nome do produto"
                        />

                        <input className={styles.input}
                        type="number"
                        placeholder="Digite o preço do produto"
                        />

                        <textarea  className={styles.input}
                        placeholder="Descreva seu produto..."
                        />

                        <button type="submit" className={styles.button}>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth( async (context)=> {
    const apiClient = setupAPIClient(context)

    const response = await apiClient.get("/category");

    return {
        props: {
            categoryList: response.data
        }
    }
})