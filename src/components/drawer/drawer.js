import React from 'react';
import styled from "styled-components";
import { Brand, Details, GiftCard, ProductDescription, ProductImage } from '../contents/contents';

const DrawerContainer = styled.div`
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 80%;
  background-color: rgb(29 29 29 / 96%);
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  transform: translateX(${(props) => (props.open ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
`;

const DrawerContent = styled.div`
  padding: 20px;
`;

const CartCard = styled(GiftCard)`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0.7rem;
    margin: 1rem 0;
    text-align: center;
    max-width: 100vw;
`;

const CartProductImage = styled(ProductImage)`
    width: 55%;
    height: auto;
`;

const CartCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
`;
const CartProductDescription = styled(ProductDescription)`
    text-align: initial;
`;

export default function Drawer({ cart, isDrawerOpen, drawerRef, handleCardClick }) {
    const renderCart = () => {
        if (!cart) return null;

        return cart?.cart?.map((giftCard) => (
            <CartCard
                key={giftCard.productId}
                onClick={() => handleCardClick(giftCard)}
            >
                <CartProductImage
                    src={giftCard.productImage}
                    alt={giftCard.brandName}
                />
                <CartCardContainer>

                    <Brand>{giftCard.brandName}</Brand>
                    <CartProductDescription>
                        {giftCard.termsAndConditions}
                    </CartProductDescription>
                    <Details>
                        <p>$ {giftCard.denominations[0]}</p>
                    </Details>
                </CartCardContainer>
            </CartCard>
        ))
    };

    return <DrawerContainer open={isDrawerOpen} ref={drawerRef}>
        <DrawerContent>
            {renderCart()}
        </DrawerContent>
    </DrawerContainer>
}
