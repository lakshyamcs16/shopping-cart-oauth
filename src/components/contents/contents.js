import React from 'react'
import styled, { keyframes } from "styled-components";


const BrandName = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #fff;
`

export function Brand({ name }) {
    return (
        <BrandName>{name}</BrandName>
    )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const GiftCard = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
  background-color: rgb(130 117 117 / 13%);
  border-radius: 8px;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
  max-width: 320px;
  box-shadow: -5px -5px 9px rgb(130 117 117 / 45%), 5px 5px 9px rgb(48 46 46 / 30%);
`

export function Card({ children }) {
    return (
        <GiftCard>{children}</GiftCard>
    )
}


export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`

export function Image({src, alt, style}) {
    return (
        <ProductImage
            style={style}
            src={src}
            alt={alt}
        />
    )
}

export const ProductDescription = styled.p`
font-size: 14px;
color: #fff;
flex-grow: 1; /* Allow the description to grow vertically */
`;

export const Details = styled.div`
  margin-top: 10px;
  font-size: 2rem;
  color: #fff;
`;