import { render } from "@testing-library/react";
import { getByTestId } from "@testing-library/dom";
import { Basket } from "../components/Basket";
import { store } from "../store/store";
import { Provider } from "react-redux";

test("renders Basket component", () => {
  const { container } = render(
    <Provider store={store}>
      <Basket />
    </Provider>
  );

  const basketElement = getByTestId(container, "basket-apple");
  expect(basketElement).toBeDefined();
});

test("basket displays correct number of apples", () => {
  store.dispatch({ type: "apple/incrementBasketCount", payload: 1 });

  const { container } = render(
    <Provider store={store}>
      <Basket />
    </Provider>
  );

  const apples = container.querySelectorAll('[data-testid="basket-apple"]');
  expect(apples.length).toEqual(1);
});
