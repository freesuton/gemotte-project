import {useEffect,useState}  from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'
import styles from '../styles/Home.module.css'
import MintPage from '../comps/MintPage'

export default function Home() {
  const [connected, setConnected] = useState(false);

  return (
    <>
     
      <MintPage />
      
    </>
  )
}