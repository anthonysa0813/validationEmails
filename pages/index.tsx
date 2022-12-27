import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import FormFile from "../components/FormFile";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center h-screen main bg-slate-900">
        <section className="w-2/6 p-4 text-center bg-white border border-blue-500 rounded-lg main">
          <h1 className="text-lg text-3xl ">Validación de correos</h1>
          <FormFile />
        </section>
      </div>
    </>
  );
}
