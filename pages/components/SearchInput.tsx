import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef } from "react";
import Typed from "typed.js";

var typer;
const SearchInput = () => {
  const router = useRouter();
  const mount = useRef(false);
  var options = {
    strings: ["Harry Styles", "Avicii", "Sweater Weather", "Outside"],
    typeSpeed: 50,
    loop: true,
  };

  const onChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { value } = (e.target as HTMLInputElement);
    if (value.length > 0) {
      if (typer) {
        console.log(value)
        typer.destroy();
      }
    } else typer = new Typed(".typer", options);
  };

  useEffect(() => {
    if (mount.current) {
      console.log("sss")
      typer = new Typed(".typer", options);
    } else mount.current = true;

    window.addEventListener("resize", function () {
      let canvas = document.querySelector(".vanta-canvas") as HTMLCanvasElement;
      canvas.style.width = `${window.innerWidth}`;
      canvas.style.height = `${window.innerHeight}`;
    });
  }, [mount]);
  return (
    <div className="search-wrapper">
      <label className="relative h-full block">
        <input
          type="search"
          className="px-5 h-full w-full text-black"
          onChange={onChange}
          onKeyDown={(e) => {
            const { value } = e.target as HTMLInputElement;
            if (e.key === "Enter")
              if (value.length > 0) {
                sessionStorage.setItem("search", value);
                router.push(`components/${value}`);
              } else {
                (e.target as HTMLInputElement).parentElement?.classList.add(
                  "warning"
                );
                setTimeout(() => {
                  (
                    e.target as HTMLInputElement
                  ).parentElement?.classList.remove("warning");
                }, 1000);
              }
          }}
        />
        <div className="typer-wrapper text-gray-400">
          <span className="typer"></span>
        </div>
      </label>
      <p className="text-gray-400">Search for any music, artist or album.</p>
    </div>
  );
};

export default SearchInput;
