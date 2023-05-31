import { useEffect, useState } from "react";
import { TreeSvg } from "../assets/treeSvg";
import { Apple } from "./Apple";
import { useDispatch, useSelector } from "react-redux";
import {
  addApple,
  removeApple,
  resetApples,
  setAppleColor,
  setAppleFalling,
  setAppleInBasket,
} from "../store/appleSlice";
import { v4 as uuidv4 } from "uuid";

import "../styles/Tree.scss";

import { RootState } from "../store/store";

export const Tree = () => {
  const dispatch = useDispatch();
  const apples = useSelector((state: RootState) => state.apple.apples);
  const [treeShaking, setTreeShaking] = useState<boolean>(false);
  const [disableResetButton, setDisableResetButton] = useState<boolean>(false);
  const [showExtraFeatures, setShowExtraFeatures] = useState<boolean>(false);

  const handleToggleClick = () => {
    setShowExtraFeatures(!showExtraFeatures);
  };

  const appleFall = (appleId: string) => {
    setTimeout(() => {
      dispatch(setAppleFalling(appleId));
      setTimeout(() => {
        dispatch(setAppleInBasket(appleId));
      }, 2000);
    }, 1000);
  };

  function getRandomPosition(min: number, max: number) {
    const randomPercentage = () =>
      Math.floor(Math.random() * (max - min + 1) + min) + "%";

    return { top: randomPercentage(), left: randomPercentage() };
  }

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      const appleId = uuidv4();

      const topPosition = getRandomPosition(10, 36);
      const leftPosition = getRandomPosition(10, 80);

      dispatch(
        addApple({
          id: appleId,
          color: "#ff0800",
          isFalling: false,
          isInBasket: false,
          top: topPosition.top,
          left: leftPosition.left,
        })
      );
    }
  }, [dispatch]);

  const handleTreeClick = () => {
    if (!treeShaking) {
      setTreeShaking(true);
      setTimeout(() => {
        apples.forEach((apple, index) => {
          if (!apple.isFalling && !apple.isInBasket) {
            setTimeout(() => {
              appleFall(apple.id);
            }, 1000 * index);
          }
        });
      }, 3000);

      setTimeout(() => {
        setTreeShaking(false);
      }, 3000 + 1000 * apples.length);

      setTimeout(() => {
        setDisableResetButton(false);
      }, 3000 * apples.length + 3000);
    }
  };

  const handleResetButtonClick = () => {
    setTreeShaking(false);
    const existingAppleCount = apples.length;

    dispatch(resetApples());

    for (let i = 0; i < existingAppleCount; i++) {
      const appleId = uuidv4();

      const topPosition = getRandomPosition(10, 36);
      const leftPosition = getRandomPosition(10, 80);

      dispatch(
        addApple({
          id: appleId,
          color: "#ff0800",
          isFalling: false,
          isInBasket: false,
          top: topPosition.top,
          left: leftPosition.left,
        })
      );
    }
  };

  const handleIncrementAppleCount = () => {
    const appleId = uuidv4();

    const topPosition = getRandomPosition(10, 36);
    const leftPosition = getRandomPosition(10, 80);

    dispatch(
      addApple({
        id: appleId,
        color: "#ff0800",
        isFalling: false,
        isInBasket: false,
        top: topPosition.top,
        left: leftPosition.left,
      })
    );
  };

  const handleDecrementAppleCount = () => {
    if (apples.length > 0) {
      const appleId = apples[apples.length - 1].id;
      dispatch(removeApple(appleId));
    }
  };

  const handleColorChange = (e) => {
    const color = e.target.value;

    apples.forEach((apple) => {
      dispatch(setAppleColor({ id: apple.id, color }));
    });
  };

  return (
    <>
      <button className="handleExtraFutures" onClick={handleToggleClick}>
        {showExtraFeatures ? "Hide extra features" : "Show extra features"}
      </button>
      {showExtraFeatures && (
        <>
          <div className={`incDecContainer `}>
            <button
              onClick={handleDecrementAppleCount}
              className="countChanger"
            >
              -
            </button>
            <button
              onClick={handleIncrementAppleCount}
              className="countChanger"
            >
              +
            </button>
          </div>
          <div className="colorChanger">
            <input
              type="color"
              id="apple1"
              name="apple1"
              value={apples[0]?.color || ""}
              onChange={handleColorChange}
            />
            <label htmlFor="apple1">Apple1</label>
          </div>
        </>
      )}

      <button
        className={`resetButton ${disableResetButton ? "disableButton" : ""}`}
        onClick={handleResetButtonClick}
      >
        Reset apples and basket
      </button>
      <div data-testid="tree" className="treeContainer">
        <div
          className={`tree ${treeShaking ? "shaking" : ""}`}
          onClick={handleTreeClick}
        >
          <TreeSvg />
        </div>
        {apples.map(
          (apple) =>
            !apple.isInBasket && (
              <Apple
                key={apple.id}
                color={apple.color}
                style={{ top: apple.top, left: apple.left }}
                className={`apple-${apple.id} ${
                  apple.isFalling ? "falling falling-" + apple.id : ""
                }`}
              />
            )
        )}
      </div>
    </>
  );
};
