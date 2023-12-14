
"use client";
import { useState, useEffect } from "react";
import CardComponent from "../../ui/CardComponent";
import SelectComponent from "../../ui/SelectComponent";
import InputComponent from "../../ui/InputComponent";
import { quadrilateralArea, triangleArea } from "../../utils/calculator";
import { SCALES, SHAPES, STANDARDS_FT, STANDARDS_M } from "../../constant/enum";
import styles from "./calculateMarlaStyle";
import { BorderOutlined, CaretDownOutlined, CaretUpFilled, CaretUpOutlined } from '@ant-design/icons';
import ButtonComponent from "@/components/ui/ButtonComponent";
import ModalComponent from "@/components/ui/ModalComponent";

function CalculatorMarla() {
  const [standard, setStandard] = useState(250);
  const [scale, setScale] = useState("ft");
  const [shape, setShape] = useState("tri");

  const [side1, setSide1] = useState(0);
  const [side2, setSide2] = useState(0);
  const [side3, setSide3] = useState(0);
  const [side4, setSide4] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const [area, setArea] = useState(0);

  const { heading, card } = styles.classes;
  const { sliderStyle, sliderOuterStyle, cardStyle, cardStyleSelected, iconFont, buttonPrimary } = styles.styles;

  useEffect(() => {
    if (standard && scale && side1 && side2 && side3) {
      if (shape === "tri") {
        setArea(triangleArea(Number(side1), Number(side2), Number(side3), standard));
      } else if (shape === "rect" && side4) {
        setArea(quadrilateralArea(Number(side1), Number(side2), Number(side3), Number(side4), standard));
      }
    }
  }, [standard, scale, shape, side1, side2, side3, side4, isShow]);

  const calculate=()=>{
    setIsShow(true);
  }




  return (
    <>
      <h1 className={heading}>Calculate Marla</h1>
      <div className="flex flex-wrap min-w-full p-4 gap-4">
        <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
          <label className="w-full">Select Unit: </label>
          <SelectComponent className="w-full" placeholder="Select Unit" options={SCALES} onChange={(value) => { setScale(value); setStandard(null) }} value={scale} />
        </div>
        <div className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
          <label className="w-full">Select Standard: </label>
          <SelectComponent className="w-full" placeholder="Select Standard" options={scale == 'ft' ? STANDARDS_FT : STANDARDS_M} onChange={(value) => setStandard(value)} value={standard} />
        </div>

      </div>
      <label className="w-full p-4">Select Shape: </label>
      <div style={sliderOuterStyle}>

        <div style={sliderStyle}>
          <div style={shape == "rect" ? cardStyleSelected:cardStyle} onClick={(e)=>{
            setShape("rect");
            setSide4(0);
          }}>
            <BorderOutlined />
          </div>
          <div  style={shape == "tri" ? cardStyleSelected:cardStyle} onClick={(e)=>{
            setShape("tri");
          }}>
            <CaretDownOutlined />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap min-w-full">
        <div className="w-full first-letter text-center p-4">
          <InputComponent className="max-w-xs" placeholder="Side 1" onChange={(e) => setSide1(e.target.value)} value={side1} />
        </div>
        <div className="w-1/3 text-center flex items-center justify-center p-4">
          <InputComponent className="max-w-1/2" placeholder="Side 2" onChange={(e) => setSide2(e.target.value)} value={side2} />
        </div>
        <div className="w-1/3 text-center text-black" style={iconFont}>
        {shape=="rect" ? <BorderOutlined/> :  <CaretDownOutlined />}
        </div>
        <div className="w-1/3 text-center flex items-center justify-center p-4">
          <InputComponent className="max-w-1/2" placeholder="Side 3" onChange={(e) => setSide3(e.target.value)} value={side3} />
        </div>
        {shape=="rect" && <div className="w-full text-center p-4">
          <InputComponent className="max-w-xs" placeholder="Side 4" onChange={(e) => setSide4(e.target.value)} value={side4} />
        </div>}
      </div>
<div className="p-8">
      <ButtonComponent onClick={(e)=>{calculate()}} type="primary" style={buttonPrimary}>Calculate</ButtonComponent>
      </div>

      {isShow && !isNaN(area) && <ModalComponent title="Calculate" footer={[]} open={isShow} onCancel={()=>{setIsShow(false)}}>
      <h1>Marla: {area}</h1>
      </ModalComponent>} 
    </>
  );
}

export default CalculatorMarla;
