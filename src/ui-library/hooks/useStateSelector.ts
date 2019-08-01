import { useContext, useState, useEffect } from "react";
import { AppStoreContext } from "../../state-library/AppStoreContext";
import { Selectors, WithSelector } from "../../state-library/selectors";

export function useStateSelector<T>(
  chooseSelector: (selectors: Selectors) => () => T
): T | undefined {
  const [currentState, setCurrentState] = useState<T | undefined>();
  const { selectors, subscribe } = useContext(AppStoreContext);
  useEffect(() => {
    const { unsubscribe } = subscribe(
      chooseSelector(selectors),
      setCurrentState
    );
    return unsubscribe;
  }, [chooseSelector, selectors, subscribe, setCurrentState]);
  return currentState;
}

export { WithSelector };
