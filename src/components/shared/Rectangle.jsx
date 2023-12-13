
"use client";
import { useState, useEffect } from "react";
import CardComponent from "../global/CardComponent";
import SelectComponent from "../global/SelectComponent";
import InputComponent from "../global/InputComponent";

function Rectangle() {
  const [standard, setStandard] = useState(250);
  const [scale, setScale] = useState("ft");
  const [shape, setShape] = useState("tri");

  const [side1, setSide1] = useState(0);
  const [side2, setSide2] = useState(0);
  const [side3, setSide3] = useState(0);
  const [side4, setSide4] = useState(0);
  const [isQuad, setIsQuad] = useState(false);

  const [area, setArea] = useState(0);

  useEffect(() => {
    if (standard && scale && side1 && side2 && side3) {
      if (shape === "tri") {
        setArea(triangleArea(Number(side1), Number(side2), Number(side3)));
      } else if (shape === "rect" && side4) {
        setArea(quadrilateralArea(Number(side1), Number(side2), Number(side3), Number(side4)));
      }
    }
  }, [standard, scale, shape, side1, side2, side3, side4]);

  function triangleArea(side1, side2, side3) {
    const s = (side1 + side2 + side3) / 2;
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    return area / standard;
  }

  function quadrilateralArea(side1, side2, side3, side4) {
    const s1 = (side1 + side2 + side3) / 2;
    const s2 = (side3 + side4 + side1) / 2;
    const area1 = Math.sqrt(s1 * (s1 - side1) * (s1 - side2) * (s1 - side3));
    const area2 = Math.sqrt(s2 * (s2 - side3) * (s2 - side4) * (s2 - side1));
    const totalArea = area1 + area2;
    return totalArea / standard;
  }

  const SCALES = [{ label: "Feet", value: "ft" }, { label: "Meter", value: "m" }];
  const STANDARDS = [
    { label: scale === "ft" ? "250.00" : "76.2", value: scale === "ft" ? 250 : 76.2 },
    { label: scale === "ft" ? "272.25" : "82.9", value: scale === "ft" ? 272.25 : 82.9 },
  ];
  const SHAPES = [{ label: "Quadrilateral", value: "rect" }, { label: "Triangle", value: "tri" }];

  return (
    <>
      <h1 className="text-lg text-center p-4 font-bold">Calculate Marla</h1>
      <div className="flex flex-wrap min-w-full p-4 gap-4">
        <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
          <label className="w-full">Select Unit: </label>
          <SelectComponent  className="w-full" placeholder="Select Unit" options={SCALES} onChange={(value) => { setScale(value); setStandard(null) }} value={scale} />
        </div>
        <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
          <label className="w-full">Select Standard: </label>
          <SelectComponent  className="w-full" placeholder="Select Standard" options={STANDARDS} onChange={(value) => setStandard(value)} value={standard} />
        </div>
        <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
          <label className="w-full">Select Shape: </label>
          <SelectComponent  className="w-full" placeholder="Select Shape" options={SHAPES} onChange={(value) => {
            setShape(value);
            if (value === "rect") {
              setIsQuad(true);
            } else {
              setIsQuad(false);
              setSide4(0);
            }
          }} value={shape} />
        </div>
      </div>

      <div className="flex flex-wrap min-w-full p-4 gap-4">
        <div className="w-full md:w-1/5 lg:w-1/5 xl:w-1/5">
          <label className="w-full">Side 1: </label>
          <InputComponent placeholder="Side 1" onChange={(e) => setSide1(e.target.value)} value={side1} />
        </div>
        <div className="w-full md:w-1/5 lg:w-1/5 xl:w-1/5">
          <label className="w-full">Side 2: </label>
          <InputComponent placeholder="Side 2" onChange={(e) => setSide2(e.target.value)} value={side2} />
        </div>
        <div className="w-full md:w-1/5 lg:w-1/5 xl:w-1/5">
          <label className="w-full">Side 3: </label>
          <InputComponent placeholder="Side 3" onChange={(e) => setSide3(e.target.value)} value={side3} />
        </div>
        {isQuad && <div className="w-full md:w-1/5 lg:w-1/5 xl:w-1/5">
          <label className="w-full">Side 4: </label>
          <InputComponent placeholder="Side 4" onChange={(e) => setSide4(e.target.value)} value={side4} />
        </div>}
      </div>
      
      {isNaN(area) ? null : <div className="p-4">
        <h1>Marla: {area}</h1>
      </div>}
    </>
  );
}

export default Rectangle;
