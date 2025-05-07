import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { productsApi } from './features/apiSlice.ts'

createRoot(document.getElementById('root')!).render(

    <ApiProvider api = {productsApi}>
        <App/>
    </ApiProvider>

)
