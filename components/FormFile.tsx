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

const FormFile = () => {
  const [isDesabled, setIsDesabled] = useState(true);
  const [valueFile, setValueFile] = useState<any>(null);
  const [fileContent, setFileContent] = useState<any>(null);
  const refInput = useRef<any>();
  const [isValidateFieldsFile, setIsValidateFieldsFile] = useState(true);
  const [arrObjectsEmail, setArrObjectsEmail] = useState<ObjectEmail[] | []>(
    []
  );

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
          console.log("new arr", newArr);
        } else {
          setIsValidateFieldsFile(false);
        }
      });
    }
  };

  return (
    <form
      className="block flex flex-col items-center gap-4"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col items-start gap-0 mt-3">
        {!isValidateFieldsFile && (
          <h2 className="text-red-500">Campos requeridos (lote & correo)</h2>
        )}
        <span className="text-red-200">Sube un archivo en formato: xlsx</span>
        <input
          ref={refInput}
          type="file"
          className="bg-blue-500 rounded-md mt-3 
                file:bg-gradient-to-b
                  file:from-blue-500
                  file:to-blue-600
                  file:border-none
                  file:text-white
                  file:cursor-pointer
                  file:shadow-sm
                  file:shadow-bluw-600/50
                  w-full
                  lg:w-auto
                  text-white/80
                  p-1
                  m-0
                  mt-0
                  "
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
  );
};

export default FormFile;
