import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import FormFile from "../components/FormFile";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="main bg-slate-900  h-screen flex justify-center items-center">
        <section className="main p-4 border  text-center  border-blue-500 rounded-lg w-2/6">
          <h1 className="text-yellow-50 text-lg text-3xl ">
            Validación de correos
          </h1>
          <FormFile />
        </section>
      </div>
    </>
  );
}
