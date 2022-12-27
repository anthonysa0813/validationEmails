import { SaveEmailInterface, ObjectEmail } from "../../intefaces/index";

export const sendEmailArr = async (data: any) => {
  const response = await fetch(
    `https://validation-emails.vercel.app/api/correos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const dataResponse = await response.json();
  return dataResponse;
};
