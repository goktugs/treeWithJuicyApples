import { render, fireEvent } from "@testing-library/react";
import { getByTestId, getByText } from "@testing-library/dom";
import { Tree } from "../components/Tree";
import { store } from "../store/store";
import { Provider } from "react-redux";

test("renders Tree component", () => {
  const { container } = render(
    <Provider store={store}>
      <Tree />
    </Provider>
  );

  const treeElement = getByTestId(container, "tree");
  expect(treeElement).toBeDefined();
});

test("reset button resets apples", () => {
  const { container } = render(
    <Provider store={store}>
      <Tree />
    </Provider>
  );

  const resetButton = getByText(container, "Reset apples and basket");
  fireEvent.click(resetButton);

  const apples = container.querySelectorAll('[data-testid="apple"]');
  expect(apples.length).toEqual(0);
});
