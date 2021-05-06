import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '../services/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

import styles from './home.module.scss'

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string,
  duration: number,
  durationAsString: string,
  // description: string,
  url: string,
  // type: string,
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];

}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  // props.latestEpisodes[0].
  // props.allEpisodes[0].
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos Lançamentos</h2>

        <ul>
          {latestEpisodes.map(episode => {
            return (
            <li key={episode.id}>
              <Image
              width={192} 
              height={192} 
              src={episode.thumbnail}
              alt={episode.title}
              objectFit="cover"
              />

              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
              <span>{episode.publishedAt}</span>
              <span>{episode.durationAsString}</span>
              </div>

              <button type="button">
                <img src="/play-green.svg"
                alt="tocar episódio" />
              </button>
            </li>
            )
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos os Episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>PodCast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {allEpisodes.map(episode => {
            return (
              <tr key={episode.id}>
                <td style={ {width:72} }>
                  <Image
                  width={120}
                  height={120} 
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={ {width:115} }>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button type="button">
                    <img src="/play-green.svg"
                    alt="tocar episódio"/>
                  </button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
// const data = response.data
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yyyy', { locale: ptBR }),
      duration: Number(episode.file.duration), 
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      // description: episode.description,
      url: episode.file.url,
      // type: episode.file.type,
    }
  })

  const latestEpisodes = episodes.slice(0, 2)

  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}

/* SSG ou static site generator onde há criação de páginas estáticas de tempos em tempo de acordo com o tempo estipulado no revalidate. Nota: só há ssg em produção, por isso precisamos criar uma build dentro do desenvolvimento com npm rum build e depois npm rum start

export default function Home(props) {
  return (
    <div> 
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // 60 seconds * 60 seconds * 8 hours a cada oito horas site é revalidado com novo conteúdo e durante as 8 horas o site fica estático espalhado em diversas CDN pelo mundo, sendo quase impossível derrubar a aplicação, pois durante 8 horas ela estará replicado estaticamente em diversos servidores de CDN e tudo automatizado pelo Next JS.
  }
}
SSG */

/* SSR - Server Side Render só tem 1 problema, toda vez que acessamos a aplicação acessamos também o servidor a cada requisição haverá uma chamada de servidor

export default function Home(props) {
  console.log(props.episodes)
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export async function getServerSideProps() {
    const response = await fetch('http://localhost:3333/episodes')
    const data = await response.json()

    return {
      props: {
        episodes: data,
      }
    }
}
SSR */

/* SPA - o modelo SPA não é amigável com dados de SEO, pois o problema é que o crawler como um google não aguarda a chamada de API

import { useEffect } from "react" 
useEffect() 
essa função dispara algo sempre que algo mudar na aplicação, quando algo mudar eu quero que algo aconteça
useEffect(() => {}, [])
useEffect((o que eu quero executar) => {}, [quando eu quero executar passando variáveis dentro desse array])

import { useEffect } from "react"

export default function Home() {

  useEffect(() => {
    fetch('http://localhost:3333/episodes')
    .then(response => response.json())
    .then(data => console.log(data))
}, [])

  return (
    <h1>Index</h1>
  )
}
SPA */

/*
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
*/
