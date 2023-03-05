import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const SearchInput = () => {
  const router = useRouter();
  const mount = useRef(false);
  const [search, setSearch] = useState<string>("");


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    if (value.length > 0) {
    }
  };

  useEffect(() => {
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
            setSearch(value);
            if (e.key === "Enter")
              if (value.length > 0) {
                router.push(`/components/${value}`);
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
        {search.length === 0 && (
          <div className="typer-wrapper text-gray-400">
            <TypeAnimation
              sequence={[
                "Harry Styles",
                1500,
                "Avicii",
                1500,
                "Sweater Weather",
                1500,
                "Outside",
                1500,
              ]}
              wrapper="div"
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: "1em" }}
            />
          </div>
        )}
      </label>
      <p className="text-gray-400">Search for any music, artist or album.</p>
    </div>
  );
};

export default SearchInput;
