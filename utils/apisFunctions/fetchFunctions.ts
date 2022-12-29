import { SaveEmailInterface, ObjectEmail } from "../../intefaces/index";

export const sendEmailArr = async (data: any) => {
  console.log(process.env.HOST_NAME);
  const response = await fetch(`localhost:3000/api/correos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  return dataResponse;
};
