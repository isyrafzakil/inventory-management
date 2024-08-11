import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === "PUT") {
    const { name, description, quantity, price, image_url } = req.body;
    const { data, error } = await supabase
      .from("products")
      .update({ name, description, quantity, price, image_url })
      .eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
