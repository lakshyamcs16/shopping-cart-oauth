import React from 'react';
import styled from "styled-components";
import { Brand, Details, Image, ProductDescription } from '../contents/contents';

const GiftCardModalContent = styled.div`
    display: flex;
    flex-direction: row;
    background-color: rgb(29 29 29 / 96%);

    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`

const ModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0px 1rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const ModalContent = styled.div`
    background-color: rgb(29 29 29 / 96%);
    border-radius: 8px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    animation: 0.3s ease-in 0s 1 normal none running iAjNNh;
    max-width: 700px;
    width: 90%;
    box-shadow: -5px -5px 9px rgb(130 117 117 / 45%), 5px 5px 9px rgb(48 46 46 / 30%);
`

export default function Modal({ closeModal, selectedCard }) {
    return <ModalOverlay onClick={closeModal}>
        <ModalContent>
            {/* Modal content */}
            <GiftCardModalContent>
                <Image
                    style={{
                        width: '50%'
                    }}
                    src={selectedCard.productImage}
                    alt={selectedCard.brandName}
                />
                <ModalContentContainer>

                    <Brand name={selectedCard.brandName}></Brand>
                    <ProductDescription style={{
                        display: 'contents'
                    }}>
                        {selectedCard.howToUse}
                    </ProductDescription>
                    <Details style={{ fontSize: '1.5rem' }}>
                        <p>Value: $ {selectedCard.denominations[0]}</p>
                        <p>Expiry: {selectedCard.expiryAndValidity}</p>
                    </Details>
                </ModalContentContainer>
            </GiftCardModalContent>
            {/* Add more details as needed */}
        </ModalContent>
    </ModalOverlay>
}
