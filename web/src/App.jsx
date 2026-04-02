import { useEffect, useRef, useState } from "react";
import "./App.css";
import widerBg from "./assets/bg3.jpg";
import normalBg from "./assets/bg2.jpg";
import mobileBg from "./assets/mobile.jpg";
import Icon from "./components/Icons";

const INSTAGRAM_URL = "https://instagram.com/YOUR_HANDLE";
const STORE_URL = "https://YOUR_STORE_URL.com";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const widerAspect = windowSize.width > windowSize.height * 2.5;
  const imgRef = useRef(null);
  const bgImage =
    windowSize.height > windowSize.width
      ? mobileBg
      : widerAspect
        ? widerBg
        : normalBg;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const apply = () => {
      const naturalRatio = img.naturalWidth / img.naturalHeight;
      const containerW = img.parentElement.clientWidth;
      const containerH = img.parentElement.clientHeight;
      const containerRatio = containerW / containerH;
      const isVerticalCrop = naturalRatio > containerRatio;

      const mask = isVerticalCrop
        ? `linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
           linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)`
        : `linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
           linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)`;

      img.style.webkitMaskImage = mask;
      img.style.maskImage = mask;
      img.style.webkitMaskComposite = "destination-in";
      img.style.maskComposite = "intersect";
    };

    if (img.complete) apply();
    img.addEventListener("load", apply);
    return () => img.removeEventListener("load", apply);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-lg brightness-[0.3]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* background image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          ref={imgRef}
          src={bgImage}
          alt=""
          className={`object-contain brightness-[0.52] ${
            widerAspect ? "w-auto h-full" : "w-full h-auto"
          }`}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-screen px-10 gap-6">
        <p className="text-zinc-300 font-bold text-6xl uppercase">SDS3d</p>

        <div className="w-full max-w-90 flex flex-col justify-center items-start gap-2">
          <LinkRow
            href={INSTAGRAM_URL}
            label="Instagram"
            iconType="instagram"
          />
          <LinkRow href={STORE_URL} label="Store" iconType="store" />
        </div>
      </div>
    </div>
  );
}

function LinkRow({ href, label, iconType }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-4 border-b border-zinc-200/20 no-underline transition-all duration-300 hover:opacity-70 hover:translate-x-1"
    >
      <div className="flex items-center gap-3.5 text-zinc-200 group-hover:text-white transition-colors duration-300">
        <div className="transition-transform duration-300 group-hover:scale-110">
          <Icon type={iconType} />
        </div>

        <span className="relative text-[11px] tracking-[0.15em] uppercase">
          {label}
        </span>
        <span className="absolute left-0 -bottom-1 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
      </div>

      <span className="text-zinc-200 opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

export default App;

//TODO: Make this responsive
