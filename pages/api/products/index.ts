import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const { name, description, quantity, price, image_url } = req.body;
    const { data, error } = await supabase
      .from("products")
      .insert([{ name, description, quantity, price, image_url }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
