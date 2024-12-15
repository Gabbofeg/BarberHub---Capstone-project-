import "../Products/style.css";
import { useState, useEffect } from "react";
import CustomCard from "../../components/Card/CustomCard";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

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
  
  return (
    <div>
      <div className="container product-container">
        <h2>Our Products</h2>
        {currentProducts && currentProducts.length > 0 ? (
          <div className="cardContainer d-flex gap-3 flex-wrap px-2">
            {currentProducts.map((product, index) => (
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
          <p>
            Al momento non ci risultano essere prodotti disponibili, per favore
            riprovi più tardi.
          </p>
        )}
      </div>
      <div>
        <Pagination
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
