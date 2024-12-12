import "../Card/style.css"

const CustomCard = ({ imgSrc, name, brand, description, price }) => {
  return (
    <div className="customCard d-flex">
      <img className="cardImage" src={ imgSrc } alt="product"></img>
      <div className="cardBody">
        <h4 className="cardTitle"> { name } </h4>
        <p className="cardBrand"> { brand } </p>
        <p className="cardDescription"> { description } </p>
        <button className="shopButton"> $ { price } </button>
      </div>
    </div>
  );
};

export default CustomCard;
