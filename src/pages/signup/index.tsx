import Head from "next/head"
import Image from "next/image"
import styles from "../../../styles/home.module.scss"
import logoImg from "../../../public/logo.png"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button" 

import Link from "next/link"

export default function SignUp() {
  return (
    <>
      <Head>
          <title>Faça seu cadastro agora!</title>
      </Head>

      <div className={styles.containercenter}>
          <Image className={styles.image} src={logoImg} alt="Logo Pizzapp" />

          <div className={styles.login}>
            <h1>Criando sua conta</h1>

              <form>
                < Input 
                  placeholder="Digite seu nome"
                  type="text"
                />

                < Input 
                  placeholder="Digite seu email"
                  type="email"
                />

                < Input 
                  placeholder="Digite sua senha"
                  type="password"
                />

                <Button 
                  type="submit"
                  loading={false}
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
