import { useEffect, useState } from "react";
import { TreeSvg } from "../assets/treeSvg";
import { Apple } from "./Apple";
import { useDispatch, useSelector } from "react-redux";
import {
  setApplesFalling,
  incrementBasketCount,
  resetApples,
  incrementAppleCount,
  decrementAppleCount,
} from "../store/appleSlice";

import { RootState } from "../store/store";

export const Tree = () => {
  const dispatch = useDispatch();

  const { appleCount } = useSelector((state: RootState) => state.apple);

  const applesFalling = useSelector(
    (state: RootState) => state.apple.applesFalling
  );
  const [createdApples, setCreatedApples] = useState<number[]>([]);
  const [treeShaking, setTreeShaking] = useState<boolean>(false);

  useEffect(() => {
    // elma sayısını state'de tuttuğum applecount a göre oluşturuyorum.
    setCreatedApples(Array.from({ length: appleCount }, (_, i) => i));
  }, [appleCount]);

  const handleTreeClick = () => {
    // burada elmaların ağaçtan düştüğünü kontrol ediyorum
    if (createdApples.every((_, index) => applesFalling[index])) {
      alert("There are no apples left on tree!");
      return;
    }
    if (!treeShaking) {
      setTreeShaking(true);
      setTimeout(() => {
        // burda createdapples dizisi uzunluğu kadar true değerlerden oluşan bir dizi oluşturuyorum.
        // bu dizi elmaların ağaçtan düştüğünü kontrol etmek için kullanılıyor.
        // butona tıklandığı anda elmalar zaten ağaçtan düşecek demek direkt true'ya çekiyorum.

        const newApplesFalling = createdApples.map(() => true);
        console.log(newApplesFalling);
        dispatch(setApplesFalling(newApplesFalling));

        createdApples.forEach((_, index) => {
          setTimeout(() => {
            dispatch(incrementBasketCount(1));
            const updatedApplesFalling = [...newApplesFalling];
            updatedApplesFalling[index] = false;
            dispatch(setApplesFalling(updatedApplesFalling));
            setCreatedApples((prevCreatedApples) =>
              prevCreatedApples.filter((appleIndex) => appleIndex !== index)
            );
          }, index * 1000 + 2000);
        });
      }, 3000);

      setTimeout(() => {
        setTreeShaking(false);
      }, 3000);
    }
  };

  const handleResetButtonClick = () => {
    dispatch(resetApples());
    setCreatedApples(Array.from({ length: appleCount }, (_, i) => i));
  };

  const handleIncrementAppleCount = () => {
    if (appleCount < 10) {
      dispatch(incrementAppleCount());
      const newApplesFalling = createdApples.map(() => false);
      dispatch(setApplesFalling(newApplesFalling));
    } else {
      alert("You can't add more apples!");
    }
  };

  const handleDecrementAppleCount = () => {
    if (appleCount > 0) {
      dispatch(decrementAppleCount());
      const newApplesFalling = createdApples.map(() => false);
      dispatch(setApplesFalling(newApplesFalling));
    } else {
      alert("You can't remove more apples!");
    }
  };

  return (
    <>
      <div className="incDecContainer">
        <button onClick={handleDecrementAppleCount} className="countChanger">
          -
        </button>
        <button onClick={handleIncrementAppleCount} className="countChanger">
          +
        </button>
      </div>
      <button className="resetButton" onClick={handleResetButtonClick}>
        Reset apples and basket
      </button>
      <div data-testid="tree" className="treeContainer">
        <div
          className={`tree ${treeShaking ? "shaking" : ""}`}
          onClick={handleTreeClick}
        >
          <TreeSvg />
        </div>
        {createdApples.map((index) => (
          <Apple
            key={index}
            className={`apple-${index} ${
              applesFalling[index] ? "falling falling-" + index : ""
            }`}
          />
        ))}
      </div>
    </>
  );
};
