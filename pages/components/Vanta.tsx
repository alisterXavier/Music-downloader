import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";
import { RequireType } from "../../Types-interfaces";

const Vanta = ({ children }: RequireType) => {
  const vantaRef = useRef(null);
  const vantaView = useRef(false);

  useEffect(() => {
    if (!vantaView.current && vantaRef.current) {
      vantaView.current = HALO({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        xOffset: 0.15,
        size: 1.5,
        backgroundColor: 0x000c18,
      });
    }
  }, []);

  return (
    <div
      className="w-screen h-screen  flex flex-col justify-center"
      id="home-bg"
      ref={vantaRef as React.RefObject<HTMLDivElement>}
    >
      {children}
    </div>
  );
};

export default Vanta;
