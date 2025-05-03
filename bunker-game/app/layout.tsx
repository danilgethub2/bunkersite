import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Бункер - Онлайн игра на выживание',
  description: 'Многопользовательская онлайн игра "Бункер" - определите, кто выживет в апокалипсисе!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
} 