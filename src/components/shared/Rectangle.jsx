"use client";
import { useState, useEffect } from "react";
import CardComponent from "../global/CardComponent";
import SelectComponent from "../global/SelectComponent";

function Rectangle() {
  //STATES
  const [standard, setStandard] = useState();
  const [scale, setScale] = useState();
  const [shape, setShape] = useState();

  useEffect(() => {
    console.log("Values: ", standard, scale, shape)
  }, [standard, scale, shape])




  //ENUMS
  const STANDARDS = [{ label: "250.00", value: "250" }, { label: "272.25", value: "272.25" }];
  const SCALES = [{ label: "Feet", value: "ft" }, { label: "Meter", value: "m" }];
  const SHAPES = [{ label: "Rectangle", value: "rect" }, { label: "Triangle", value: "tri" }];
  return (
    <>
      <h1 className='text-lg text-center p-4 font-bold'>Calculate Marla</h1>
      <div className="flex flex-wrap min-w-full p-4 gap-4">
        <SelectComponent className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4" placeholder={"Select Standard"} options={STANDARDS} bordered={true} title={"Select Standard"} onChange={(value) => setStandard(value)} value={standard} />
        <SelectComponent className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4" placeholder={"Select Unit"} options={SCALES} bordered={true} title={"Select Unit"} onChange={(value) => setScale(value)} value={scale} />
        <SelectComponent className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4" placeholder={"Select Shape"} options={SHAPES} bordered={true} title={"Select Shape"} onChange={(value) => setShape(value)} value={shape} />
      </div>
    </>
  )
}

export default Rectangle;