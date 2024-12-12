import CustomCard from "../Card/CustomCard";
import "./style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";

const CardCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
    <div className="d-flex carousel-container">
      <h2>Our Products</h2>
      <Slider {...settings} className="slider-carousel">
        {products.map((product) => (
            <CustomCard
              imgSrc={product.imgSrc}
              name={product.name}
              brand={product.brand}
              description={product.description}
              price={product.price}
            />
        ))}
      </Slider>
    </div>
  );
};

export default CardCarousel;
