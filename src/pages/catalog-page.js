import React from "react"
import { useState, useRef, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { selectCart, add } from "../features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import mocked from '../mock/data.json';
import { useAuth0 } from "@auth0/auth0-react";
import { getProtectedResource } from "../services/message.service";
import { PageLayout } from "../components/page-layout";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const GiftCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  grid-gap: 20px;
`

const ClickableCard = styled.div`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: center;
`

const GiftCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in;
`

const GiftCardModalContent = styled.div`
    display: flex;
    flex-direction: row;
    background-color: rgb(255, 255, 255);
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
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    animation: 0.3s ease-in 0s 1 normal none running iAjNNh;
    max-width: 700px;
    width: 90%;
`

const BrandName = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333333;
`

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`

const ProductDescription = styled.p`
  font-size: 14px;
  color: #777777;
  flex-grow: 1; /* Allow the description to grow vertically */
`

const Details = styled.div`
  margin-top: 10px;
  font-size: 2rem;
  color: #000;
`

const ActionButton = styled.button`
  background-color: #ff6f61;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 6rem;

  &:hover {
    background-color: #ff5745;
  }
`

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    height: -webkit-fill-available;
    align-items: center;
`

const DrawerContainer = styled.div`
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 80%;
  background-color: #ffffff;
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

const GiftCardCatalogue = ({ giftCards }) => {
    const [selectedCard, setSelectedCard] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isCartUpdated, setIsCartUpdated] = useState(false);
    const drawerRef = useRef(null);
    const cart = useAppSelector(selectCart);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                closeDrawer();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeModal = () => {
        setSelectedCard(null)
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const addToCart = (e, product) => {
        e.stopPropagation();
        // Perform the action of adding the card to the cart
        const productWithId = { ...product };
        productWithId.productId = product.productId + Date.now();
        dispatch(add(productWithId))
        setIsCartUpdated(true);
        console.log('Added to cart:', product);
    };

    useEffect(() => {
        if (isCartUpdated) {
            setIsDrawerOpen(true);
            setIsCartUpdated(false);
        }
    }, [isCartUpdated]);

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

                        <BrandName>{giftCard.brandName}</BrandName>
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

    return (
        <>
            <GiftCardContainer>
                {giftCards.map((giftCard) => (
                    <ClickableCard
                        className="auth0-feature"
                        key={giftCard.productId}
                        onClick={() => handleCardClick(giftCard)}
                    >
                        <GiftCard>
                            <ProductImage
                                src={giftCard.productImage}
                                alt={giftCard.brandName}
                            />
                            <BrandName>{giftCard.brandName}</BrandName>
                            <ProductDescription className="auth0-feature__description">
                                {giftCard.termsAndConditions}
                            </ProductDescription>
                            <Details>
                                <p>$ {giftCard.denominations[0]}</p>
                            </Details>
                            <ActionButton onClick={(e) => addToCart(e, giftCard)}>Add to cart</ActionButton>
                        </GiftCard>
                    </ClickableCard>
                ))}
                {selectedCard && (
                    <ModalOverlay onClick={closeModal}>
                        <ModalContent>
                            {/* Modal content */}
                            <GiftCardModalContent>
                                <ProductImage 
                                    style={{
                                        width: '50%'
                                    }}
                                    src={selectedCard.productImage}
                                    alt={selectedCard.brandName}
                                />
                                <ModalContentContainer>

                                <BrandName>{selectedCard.brandName}</BrandName>
                                <ProductDescription>
                                    {selectedCard.howToUse}
                                </ProductDescription>
                                <Details style={{fontSize: '1.5rem' }}>
                                    <p>Value: $ {selectedCard.denominations[0]}</p>
                                    <p>Expiry: {selectedCard.expiryAndValidity}</p>
                                </Details>
                                </ModalContentContainer>
                            </GiftCardModalContent>
                            {/* Add more details as needed */}
                        </ModalContent>
                    </ModalOverlay>
                )}
                {
                    <DrawerContainer open={isDrawerOpen} ref={drawerRef}>
                        <DrawerContent>
                            {renderCart()}
                        </DrawerContent>
                    </DrawerContainer>
                }
            </GiftCardContainer>
        </>
    )
}

export const CatalogPage = () => {
    const [giftCards, setGiftCards] = useState(null);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getAccessTokenSilently();
            const { data } = await getProtectedResource(accessToken);

            if (!isMounted) {
                return;
            }

            if (data) {
                setGiftCards(mocked);
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently]);


    return (
        <PageLayout>
            <Container>
                {giftCards && <GiftCardCatalogue giftCards={giftCards.brands} />}
            </Container>
        </PageLayout>
    );
};


