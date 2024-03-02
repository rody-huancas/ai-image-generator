import "./image-generator.css";
import default_image from "../assets/default_image.svg";

export const ImageGenerator = () => {
  return (
    <div className="ia-image-generator">
      <div className="header">
        Ai Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={default_image} alt="ia image" />
        </div>
      </div>
      <div className="search-box">
        <input type="text" className="search-input" placeholder="Describe What You Want To See" />
        <div className="generate-btn">Generate</div>
      </div>
    </div>
  );
};
