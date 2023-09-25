import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import ProductForm from "../ProductForm";
import Comments from "../Comments";
import { StyledLink } from "../Link/Link.styled";
import { useState } from "react";

export default function Product() {
  const [isEditMode, setisEditMode] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/products/${id}`);

  async function handleEditProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (response.ok) {
      mutate();
    }
  }

  async function handelDeleteProduct() {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    router.push("/");
    // if (!response) {
    //   response.status(404).json({ status: "Error" });
    // }
  }

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
      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
      <StyledLink href="/">Back to all</StyledLink>
      <button
        type="button"
        onClick={() => {
          setisEditMode(!isEditMode);
        }}
      >
        Edit
      </button>
      {isEditMode && <ProductForm onSubmit={handleEditProduct} />}
      <button
        type="button"
        onClick={() => {
          handelDeleteProduct(id);
        }}
      >
        Delete
      </button>
    </ProductCard>
  );
}
