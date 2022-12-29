import React, {
  DetailedHTMLProps,
  FormEvent,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import readXlsxFile from "read-excel-file";

import { ObjectEmail } from "../intefaces/index";
import { sendEmailArr } from "../utils/apisFunctions";
import Image from "next/image";

interface PropFile {}

const FormFile = () => {
  const [isDesabled, setIsDesabled] = useState(true);
  const [valueFile, setValueFile] = useState<any>(null);
  const [fileContent, setFileContent] = useState<any>(null);
  const refInput = useRef<any>();
  const [isValidateFieldsFile, setIsValidateFieldsFile] = useState(true);
  const [arrObjectsEmail, setArrObjectsEmail] = useState<ObjectEmail[] | []>(
    []
  );
  const [statusDataSend, setStatusDataSend] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  }, []);

  useEffect(() => {
    if (valueFile) {
      const nameExtension = valueFile.split(".")[1];
      console.log(nameExtension);
      if (nameExtension !== "xlsx") {
        setIsDesabled(true);
      } else {
        setIsDesabled(false);
      }
    }
  }, [valueFile]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (refInput.current) {
      readXlsxFile(refInput.current.files[0]).then((rows) => {
        if ([rows[0][0], rows[0][3]].includes("lote" && "CORREO1")) {
          setIsValidateFieldsFile(true);
          const newArr = rows.map((item, index) => {
            if (index > 0) {
              return {
                lote: item[0],
                correo: item[item.length - 1],
              };
            }
          });

          const copyNewArr = newArr.slice(1, newArr.length - 1);
          setStatusLoading(true);
          sendEmailArr(copyNewArr).then((res: any) => {
            setStatusDataSend(res.status);
            setStatusLoading(false);
          });
        } else {
          setIsValidateFieldsFile(false);
        }
      });
    }
  };

  return (
    <>
      {statusLoading && (
        <div className="flex flex-col items-center p-4">
          <h1 className="text-3xl text-center">Subiendo la data....</h1>
          <Image
            alt="Gifs de success"
            src="/images/up.gif"
            height={200}
            width={200}
            className="text-white"
          />
        </div>
      )}
      {!statusDataSend ? (
        <form
          className="flex flex-col items-center block gap-4"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col items-start gap-0 mt-3">
            {!isValidateFieldsFile && (
              <h2 className="text-red-700">
                Campos requeridos (lote & correo)
              </h2>
            )}
            <span className="text-red-600">
              Sube un archivo en formato: xlsx
            </span>
            <input
              ref={refInput}
              type="file"
              className="w-full p-1 m-0 mt-0 mt-3 bg-blue-500 rounded-md file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:border-none file:text-white file:cursor-pointer file:shadow-sm file:shadow-bluw-600/50 lg:w-auto text-white/80 "
              onChange={(e) => {
                console.log(e);
                setValueFile(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className={`text-white p-2 rounded-md  ${
              isDesabled ? "bg-gray-400 " : "bg-green-500"
            }`}
            disabled={isDesabled}
          >
            Validar
          </button>
        </form>
      ) : (
        <div className="flex justify-center">
          <Image
            alt="Gifs de success"
            src="/images/check.gif"
            height={200}
            width={200}
            className="text-white"
          />
        </div>
      )}
    </>
  );
};

export default FormFile;
