import React from "react"
import { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { selectCart, add } from "../features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { getProtectedResource } from "../services/message.service";
import { PageLayout } from "../components/page-layout";
import CartIcon from '../assets/cart-icon.png';
import Modal from "../components/modal/Modal";
import Drawer from "../components/drawer/drawer";
import { Brand, Card, Details, Image, ProductDescription } from "../components/contents/contents";


const GiftCardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
`

const ClickableCard = styled.div`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: center;
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

const CatalogContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 65vw;
    margin: 2rem 0;
`;

const CardContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;

    select {
        margin-right: 0px !important;
    }
  }
`;

const GiftCardCatalogue = ({ giftCards }) => {
    const [selectedCard, setSelectedCard] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isCartUpdated, setIsCartUpdated] = useState(false);
    const [renderableContent, setRenderableContent] = useState(giftCards);

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

    const openDrawer = (e) => {
        e.stopPropagation();
        setIsDrawerOpen(true);
    }

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

    const search = (key) => {
        const keyToSearch = key?.toLowerCase();
        const results = giftCards.filter(giftCard => Object.values(giftCard).some(value => typeof value === 'string' && value?.toLowerCase().includes(keyToSearch)));
        setRenderableContent(results);
    }

    const handleSort = (e) => {
        e.stopPropagation();
        const key = e.target.value;
        const results = [...giftCards.sort((card1, card2) => {
            if (card1?.[key].toLowerCase() <= card2?.[key].toLowerCase()) return -1;
            return 1;
        })];
        setRenderableContent(results);
    }

    return (
        <CatalogContainer>
            <CardContainer style={{
                display: 'flex'
            }}>
                <select onChange={e => handleSort(e)} style={{
                    marginRight: '1rem',
                    borderRadius: '10px',
                    background: 'rgb(29,29,29,0.07)',
                    fontSize: '1.5rem',
                    color: 'white',
                    padding: '1rem'
                }}>
                    <option value="" disabled defaultValue="Sort By">Sort By</option>
                    <option value="brandName">Brand</option>
                    <option value="countryName">Country</option>
                </select>
                <input style={{
                    height: '5.5rem',
                    padding: '1rem',
                    borderRadius: '10px',
                    fontSize: '1.5rem',
                    color: '#fff',
                    background: 'rgb(29 29 29 / 7%)',
                    display: 'flex',
                    flexGrow: 1
                }} type="text" onChange={(e) => search(e.target.value)} placeholder="Search" />
                <button

                    onClick={(e) => openDrawer(e)}
                    style={{
                        height: '50px',
                        width: '50px',
                        boxShadow: 'rgba(255, 255, 255, 0.5) -1px -2px 6px, rgba(70, 70, 70, 0.12) 10px 10px 15px',
                        borderRadius: '50%',
                        border: 'none',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        marginLeft: '1rem',
                        background: 'rgb(29, 29, 29, 0.5)',
                        fontFamily: 'FontAwesome',
                        content: "\f011"
                    }}><img alt="Open Cart" width={30} src={CartIcon}></img></button>
            </CardContainer>
            <GiftCardContainer>
                {renderableContent.map((giftCard) => (
                    <ClickableCard
                        className="auth0-feature"
                        key={giftCard.productId}
                        onClick={() => handleCardClick(giftCard)}>
                        <Card>
                            <Image
                                src={giftCard.productImage}
                                alt={giftCard.brandName}
                            />
                            <Brand name={giftCard.brandName}></Brand>
                            <ProductDescription className="auth0-feature__description">
                                {giftCard.termsAndConditions}
                            </ProductDescription>
                            <Details>
                                <p>{giftCard.countryName}</p>
                                <p>$ {giftCard.denominations[0]}</p>
                            </Details>
                            <ActionButton onClick={(e) => addToCart(e, giftCard)}>Add to cart</ActionButton>
                        </Card>
                    </ClickableCard>
                ))}
                {selectedCard && <Modal selectedCard={selectedCard} closeModal={closeModal} />}
                <Drawer cart={cart} isDrawerOpen={isDrawerOpen} drawerRef={drawerRef} handleCardClick={handleCardClick} />
            </GiftCardContainer>
        </CatalogContainer>
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
                const parsedData = JSON.parse(data.text);
                setGiftCards(parsedData);
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


