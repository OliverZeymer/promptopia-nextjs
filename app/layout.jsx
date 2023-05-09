import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import CustomToastContainer from "@components/CustomToastContainer";
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <CustomToastContainer />
          <div className="main">
            <div className="gradient" />
          </div>
          <div className="app">
            <Nav />
            <main className="w-full">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
