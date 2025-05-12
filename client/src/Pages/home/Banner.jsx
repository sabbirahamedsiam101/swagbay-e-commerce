import { Link } from "react-router";
import BannerImage from "../../assets/header.png";
function Banner() {
  return (
    <div className="section__container header__container">
      <div className="header__content">
        <h4 className="uppercase">UP TO 20% Discount on</h4>
        <h1>Girl's Fashion</h1>
        <p>
          Discover the latest trends and express your unique style with our
          Women's Fashion website. Explore a curated collection of clothing,
          accessories, and footwear that caters to every taste and occasion .
        </p>
        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={BannerImage} alt="banner"  />
      </div>
    </div>
  );
}

export default Banner;
