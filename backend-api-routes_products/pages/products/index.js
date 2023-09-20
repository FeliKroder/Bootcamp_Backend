import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Products() {
  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  if (error) {
    return <h1>Something went wrong</h1>;
  }
  if (isLoading) {
    <div>...Loading</div>;
  }

  console.log(data[0]);
  return (
    <div>
      <ul>
        {data.map(({ id, name, description, price, currency, category }) => {
          return (
            <li
              key={id}
            >{`Name: ${name}, Description: ${description}, Price: ${price}${currency}, Category: ${category} `}</li>
          );
        })}
      </ul>
    </div>
  );
}
