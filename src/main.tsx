import { createRoot } from 'react-dom/client'

import '@/styles/tailwind.css'
import App from '@/App'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Toaster position='bottom-right' />
  </>,
)
