import "../EmptyCard/style.css";
import { useState, useEffect } from "react";

const EmptyCard = () => {
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

        console.log(data)
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
  if (error) return <div>Errore :{error}</div>;

  return (
    <div className="empty-card">
      <h3>Scopri i nostri prodotti</h3>
      <div className="d-flex gap-2 flex-wrap justify-content-center py-2">
        {products.map((product) => (
          <img src={product.imgSrc} alt={product.name}/>
        ))}
      </div>
    </div>
  );
};

export default EmptyCard;
