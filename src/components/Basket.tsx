import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { BasketSvg } from "../assets/basketSvg";
import { Apple } from "./Apple";
import "../styles/Basket.scss";
import { useState, useEffect } from "react";

export const Basket = () => {
  const apples = useSelector((state: RootState) => state.apple.apples);
  const [applePositions, setApplePositions] = useState<{
    [id: string]: { top: string; left: string };
  }>({});

  function getRandomPosition(
    minTop: number,
    maxTop: number,
    minLeft: number,
    maxLeft: number
  ) {
    const randomTop = () =>
      Math.floor(Math.random() * (maxTop - minTop + 1) + minTop) + "%";
    const randomLeft = () =>
      Math.floor(Math.random() * (maxLeft - minLeft + 1) + minLeft) + "%";

    return { top: randomTop(), left: randomLeft() };
  }

  useEffect(() => {
    apples.forEach((apple) => {
      if (apple.isInBasket && !(apple.id in applePositions)) {
        const position = getRandomPosition(25, 35, 10, 69);
        setApplePositions((positions) => ({
          ...positions,
          [apple.id]: position,
        }));
      }
    });
  }, [apples, applePositions]);

  return (
    <div data-testid="basket-apple" className="basketContainer">
      <BasketSvg width="200px" height="200px" />
      {apples.map(
        (apple) =>
          apple.isInBasket && (
            <Apple
              key={apple.id}
              className={`basket-apple-${apple.id}`}
              color={apple.color}
              style={applePositions[apple.id]}
            />
          )
      )}
    </div>
  );
};
