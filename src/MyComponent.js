import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

const MyComponent = () => {
  return <Button>Click Me</Button>;
};

export default MyComponent;
