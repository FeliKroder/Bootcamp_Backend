import { getProductById } from "@/services/productServices";

export default function handler(request, response) {
  const { id } = request.query;
  if (!getProductById(id)) {
    return response.status(404).json({ status: "Not found!" });
  }
  response.status(200).json(getProductById(id));
}
