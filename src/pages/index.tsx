/* eslint-disable react/react-in-jsx-scope */
// import Head from 'next/head'
import Image from 'next/image'
import {Typography} from '@mui/material'
import { useUser } from '../context/AuthContext'

export default function Home() {
  const {user} = useUser()
  return (
    <Typography variant="h1">Hello there</Typography>
  )
}
