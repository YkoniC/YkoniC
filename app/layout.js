export const metadata = {
  title: "YkoniC — Mode Premium N'Djamena",
  description: "Polos, survêtements, ensembles et accessoires premium. Livraison N'Djamena.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
