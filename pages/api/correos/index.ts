// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../config/db";
import { ObjectEmail } from "../../../intefaces/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.json({
        message: "OK get",
      });
    case "POST":
      try {
        const body = req.body;

        await body.forEach(async (item: ObjectEmail) => {
          const result = await pool.query(
            "INSERT INTO validador_correos SET ?",
            {
              lote: item.lote,
              correo: item.correo,
            }
          );
          console.log(result);
        });

        return res.json({
          message: "POST request",
          status: 201,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Hubo un error",
        });
      }
  }
}
