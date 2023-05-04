import { useEffect, useRef, useState } from "react";
import { TreeSvg } from "../assets/treeSvg";
import { Apple } from "./Apple";
import { useDispatch, useSelector } from "react-redux";
import {
  setApplesFalling,
  incrementBasketCount,
  resetApples,
} from "../store/appleSlice";

import { RootState } from "../store/store";

export const Tree = () => {
  const dispatch = useDispatch();

  const applesFalling = useSelector(
    (state: RootState) => state.apple.applesFalling
  );
  const [createdApples, setCreatedApples] = useState<number[]>([]);
  const [treeShaking, setTreeShaking] = useState<boolean>(false);

  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // her bir elmaya bir index atıyorum ve elmaları render ederken bu indexleri kullanıyorum.
    setCreatedApples([0, 1, 2, 3, 4, 5]);
  }, []);

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
    setCreatedApples([0, 1, 2, 3, 4, 5]);
  };

  return (
    <>
      <button className="resetButton" onClick={handleResetButtonClick}>
        Reset apples and basket
      </button>
      <div data-testid="tree" className="treeContainer">
        <div
          className={`tree ${treeShaking ? "shaking" : ""}`}
          onClick={handleTreeClick}
          ref={treeRef}
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
