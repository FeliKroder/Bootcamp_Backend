import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR("/api/products", fetcher);
}
