import { useState, useRef } from "react";
import "./image-generator.css";
import default_image from "../assets/default_image.svg";

// ENV
const API_KEY = import.meta.env.VITE_API_KEY;
const URL_API = import.meta.env.VITE_URL_API;

export const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const [loading, setLoading] = useState(false);
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if( inputRef.current.value === "" ) {
      return 0;
    } 
    setLoading(true);
    const response = await fetch(URL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
        "User-Agent": "Chrome", 
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512"
      })
    });

    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  }

  return (
    <div className="ia-image-generator">
      <div className="header">
        Ai Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={image_url === "/" ? default_image : image_url}
            alt="ia image"
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What You Want To See"
        />
        <button onClick={() => imageGenerator()} className="generate-btn">Generate</button>
      </div>
    </div>
  );
};
