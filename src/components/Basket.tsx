import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { BasketSvg } from "../assets/basketSvg";
import { Apple } from "./Apple";

export const Basket = () => {
  const basketCount = useSelector(
    (state: RootState) => state.apple.basketCount
  );
  const appleColor = useSelector((state: RootState) => state.apple.appleColor);
  const [applesInBasket, setApplesInBasket] = useState<number[]>([]);

  // Burada redux storedaki veri ile local veriyi karşılaştırarak eşit olmadığı durumda local veriyi güncelliyorum.
  // Burda elmaları render etmek için ekstradan state'de tutuyorum çünkü her seferinde redux store'a ulaşmak yeniden render yapar
  // ve performası düşürür.

  useEffect(() => {
    if (basketCount !== applesInBasket.length) {
      const newApplesInBasket = Array.from(
        { length: basketCount },
        (_, index) => index
      );
      setApplesInBasket(newApplesInBasket);
    }
  }, [basketCount, applesInBasket]);

  return (
    <div data-testid="basket-apple" className="basketContainer">
      <BasketSvg width="200px" height="200px" />
      {applesInBasket.map((index) => (
        <Apple
          key={index}
          className={`basket-apple-${index}`}
          color={appleColor}
        />
      ))}
    </div>
  );
};
