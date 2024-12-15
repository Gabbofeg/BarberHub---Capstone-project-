
import { useState, useEffect } from "react";
import './style.css'

const RatingsDisplay = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4040/ratings");

        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }

        const data = await response.json();
        setRatings(data.rating);
      } catch (err) {
        setRatings([]);
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
    <div className="rating-container">
      <h1>Rating Display</h1>
        {ratings.length > 0 ? (
          ratings.map((rating, index) => (
            <div key={index} className="comment-container">
              <h6>{rating.author?.userName || "Anonimo"}</h6>
              <p>{rating.comment || "Nessun commento disponibile"}</p>
            </div>
          ))
        ) : (
          <p>Nessun rating disponibile.</p>
        )}

    </div>
  );
};

export default RatingsDisplay;
