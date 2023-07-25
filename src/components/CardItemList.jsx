import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [openedCardIds, setOpenedCardIds] = useState([]);
  const onClickHandler = (currentId) => {
    if (openedCardIds.includes(currentId)) {
      return;
    }

    const updatedCards = cardList.map((card) =>
      card.id === currentId ? { ...card, isOpen: true } : card
    );
    setCardList(updatedCards);
    setOpenedCardIds((prevIds) => [...prevIds, currentId]);
    if (openedCardIds.length === 1) {
      const [firstCardId] = openedCardIds;
      const firstCard = cardList.find((card) => card.id === firstCardId);
      const currentCard = cardList.find((card) => card.id === currentId);

      if (firstCard.value === currentCard.value) {
        setOpenedCardIds([]);
      } else {
        setTimeout(() => {
          const updatedClosedCards = cardList.map((card) =>
            card.id === firstCardId || card.id === currentId
              ? { ...card, isOpen: false }
              : card
          );
          setCardList(updatedClosedCards);
          setOpenedCardIds([]);
        }, 500);
      }
    }
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={onClickHandler}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
