import { Link } from "react-router-dom";
import aboutImg from "../assets/images/alyk.webp";

export default function About() {
  return (
    <div className="about-container">
      <img src={aboutImg} className="about-img" />
      <div className="about-description">
        <h1>The only store where BMX culture gathers</h1>
        <p>
          Japan's proud domestic BMX frame / parts brand started in 2012 by
          three riders who have been leading the Japanese BMX scene for many
          years, Reito Murata, Yugo Ito, and Daisuke Maja. Transmitting Japanese
          brands to the world with not only in Japan, but also with team riders
          from all over the world.
        </p>
      </div>
      <div className="about-hero">
        <h3 className="about-hero-title">
          The only store where
          <br />
          BMX culture gathers.
        </h3>
        <Link className="about-hero-btn" to="/products">
          Check our products
        </Link>
      </div>
    </div>
  );
}
