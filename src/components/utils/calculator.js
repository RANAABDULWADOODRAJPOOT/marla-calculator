export const  triangleArea=(side1, side2, side3, standard)=> {
    const s = (side1 + side2 + side3) / 2;
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    return area / standard;
  }

 export const quadrilateralArea=(side1, side2, side3, side4, standard)=> {
    if(side1==side3 && side2==side4){
        return (side1*side2)/standard;
    }
    const s1 = (side1 + side2 + side3) / 2;
    const s2 = (side3 + side4 + side1) / 2;
    const area1 = Math.sqrt(s1 * (s1 - side1) * (s1 - side2) * (s1 - side3));
    const area2 = Math.sqrt(s2 * (s2 - side3) * (s2 - side4) * (s2 - side1));
    const totalArea = area1 + area2;
    return totalArea / standard;
  }