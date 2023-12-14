import React from 'react';
import { Card } from 'antd';

function CardComponent(props) {
  // Pass all the received props to the Card component
  return <Card {...props} />;
}

export default CardComponent;