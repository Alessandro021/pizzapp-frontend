import { useState, ChangeEvent, FormEvent } from "react";

import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss'

import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload} from 'react-icons/fi'
import { TextArea } from "@/src/components/ui/Input";

import { setupAPIClient } from "../../service/api";
import { toast } from "react-toastify";

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[]
}

export default function Product({categoryList}: CategoryProps){

    const [name, setName] = useState("");
    const [ price, setPrice] = useState("")
    const [ description, setDescription] = useState("")

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

    async function handleregister(event: FormEvent){
        event.preventDefault()

        try {
            const data = new FormData();

            if(name === "" || price === "" || description === "" || imageAvatar === ""){
                toast.error("Preencha todos os campos!")
                return;
            }

            data.append("name", name)
            data.append("price", price)
            data.append("description", description)
            data.append("category_id", categories[categorySelect].id)
            data.append("file", imageAvatar)

            const apiClient = setupAPIClient();

            await apiClient.post("/product", data)

            toast.success(`O produto "${name}" foi cadastrado com sucesso!`)

            
        } catch (error) {
            console.log(error)

            toast.error("Ops erro ao cadastrar!")
        }


        setName("")
        setPrice("")
        setDescription("")
        setAvatarUrl("")
        setImageAvatar("")

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

                    <form className={styles.form} onSubmit={handleregister}>

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
                        value={name}
                        onChange={text => setName(text.target.value)}
                        />

                        <input className={styles.input}
                        type="number"
                        placeholder="Digite o preço do produto"
                        value={price}
                        onChange={text => setPrice(text.target.value)}
                        />

                        <textarea  className={styles.input}
                        placeholder="Descreva seu produto..."
                        value={description}
                        onChange={text => setDescription(text.target.value)}
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