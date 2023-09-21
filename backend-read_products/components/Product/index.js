import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);
  console.log(data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <br></br>
      <h3>Reviews</h3>
      {data.reviews ? (
        data.reviews.map((review) => (
          <article key={review._id}>
            <p>
              <strong>
                ⭐️ {review.rating} / 5 {review.title}
              </strong>
            </p>
            <p>{review.text}</p>
          </article>
        ))
      ) : (
        <p>No Reviews yet ...</p>
      )}
      <br></br>
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
