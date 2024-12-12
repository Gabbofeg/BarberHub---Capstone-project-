import "../Products/style.css";
import { useState, useEffect } from "react";
import CustomCard from "../../components/Card/CustomCard";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4040/Prodotti");

        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error} </div>;
  console.log(products);
  return (
    <div className="container product-container">
      <h2>Our Products</h2>
      {products && products.length > 0 ? (
        <div className="cardContainer d-flex gap-3 flex-wrap px-2">
          {products.map((product, index) => (
            <CustomCard
              key={product.index}
              imgSrc={product.imgSrc}
              name={product.name}
              brand={product.brand}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <p>Al momento non ci risultano essere prodotti disponibili, per favore riprovi più tardi.</p>
      )}
    </div>
  );
};
