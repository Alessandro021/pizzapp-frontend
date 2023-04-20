import { useState, FormEvent, useContext} from 'react'

import Head from "next/head"
import Image from "next/image"
import styles from "../../../styles/home.module.scss"
import logoImg from "../../../public/logo.png"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button" 

import Link from "next/link"

import { AuthContext } from '@/src/contexts/AuthContext'

export default function SignUp() {
  const { signUp } = useContext(AuthContext)

  const [ name, setName] = useState("")
  const [email, SetEmail] = useState("")
  const [ password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === "" || email === "" || password === ""){
        alert("Prencha os campos corretamente!")
        return;
    }

    setLoading(true)

    let data = {
      name, email, password
    }

    await signUp(data)

    setLoading(false)

  }

  return (
    <>
      <Head>
          <title>Faça seu cadastro agora!</title>
      </Head>

      <div className={styles.containercenter}>
          <Image className={styles.image} src={logoImg} alt="Logo Pizzapp" />

          <div className={styles.login}>
            <h1>Criando sua conta</h1>

              <form onSubmit={handleSignUp}>
                < Input 
                  placeholder="Digite seu nome"
                  type="text"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />

                < Input 
                  placeholder="Digite seu email"
                  type="email"
                  value={email}
                  onChange={ event => SetEmail(event.target.value)}
                />

                < Input 
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={ event => setPassword(event.target.value)}
                />

                <Button 
                  type="submit"
                  loading={loading}
                >
                  Cadastrar
                </Button>
              </form>
                <Link legacyBehavior href="/">
                    <a className={styles.text}>Já pussui uma conta? Faça o login!</a>
                </Link>
          </div>
      </div>
    </>
  )
}
