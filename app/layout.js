import "./globals.css";
import MainHeader from "./news/main-header";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="page">
          <MainHeader />
          {children}
        </div>

      </body>
    </html>
  );
}
