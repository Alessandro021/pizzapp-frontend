import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/home.module.scss"
import logoImg from "../../public/logo.png"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

import Link from "next/link"

export default function Home() {
  return (
    <>
      <Head>
          <title>Pizzapp - Faça seu login!</title>
      </Head>

      <div className={styles.containercenter}>
          <Image className={styles.image} src={logoImg} alt="Logo Pizzapp" />

          <div className={styles.login}>
              <form>
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
                  Acessar
                </Button>
              </form>
                <Link legacyBehavior href="/signup">
                    <a className={styles.text}>Não pussui uma conta? Cadastre-se!</a>
                </Link>
          </div>
      </div>
    </>
  )
}
