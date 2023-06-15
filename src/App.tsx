import { FC, useState } from "react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetGoodsQuery,
} from "./redux/goodsApi.ts";

export const App: FC = ({}) => {
  const [count, setCount] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { data, isError, isLoading } = useGetGoodsQuery(count);
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async () => {
    if (title) {
      await addProduct({ name: title });
      setTitle("");
    }
  };
  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
  };

  if (isError) {
    return <div>Oops, something wrong...</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <select value={count} onChange={(e) => setCount(e.currentTarget.value)}>
        <option value="">All</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <h2>hello world</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder={"add new product"}
        />
        <button onClick={handleAddProduct}>+</button>
      </div>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDeleteProduct(item.id)}>x</button>
          </li>
        ))}
      </ul>
    </>
  );
};
