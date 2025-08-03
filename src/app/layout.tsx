import { Provider } from 'app/_trpcClient';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import 'app/styles/index.scss';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <title>AuthSystem - Система управления карго</title>
        <meta name="description" content="Современная система карго с ролями пользователей" />
      </head>
      <body className='h-full dark:bg-gray-900 dark:bg-none dark:text-white bg-[linear-gradient(to_bottom_right,#eff6ff,#c7d2fe)] text-gray-700'>
        <Provider>
          <NextTopLoader showSpinner={false} color='#fca5a5' />
          {children}
          <ToastContainer position='top-center' />
        </Provider>
      </body>
    </html>
  )
}