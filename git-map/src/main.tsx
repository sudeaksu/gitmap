import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// HTML'deki "root" id'li kutuyu bulup içine App'i koyuyoruz
const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
} else {
    console.error("HATA: HTML dosyasında 'root' id'li bir div bulunamadı!");
}