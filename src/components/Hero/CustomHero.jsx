import "../Hero/style.css";


const CustomHero = ({ tagLine, title, message, btnText }) => {

  return (
    <div className="heroContainer text-center">
      <div className="container pt-5 pb-5">
        <div className="row pt-5 pb-5">
          <div className="col-lg-12 col-xl-12 ms-auto pb-5 pt-5 px-2">
            <span> {tagLine} </span>
            <h1 className="display-3 fw-bold mb-3"> {title} </h1>
            {message && <p className="lead mb-3 message"> {message} </p>}
            <button className="bookBtn btn btn-danger text-black">{btnText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomHero;
