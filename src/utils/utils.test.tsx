import { debounce, tryAndCatch } from "./index";

describe("Test Utils functionality", () => {
  test("debounce() execute just once", () => {
    jest.useFakeTimers();
    const func: jest.Mock = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    // Fast-forward time
    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });

  test("tryAndCatch should call passed in function", () => {
    let triggered = false;
    const updateTriggered = () => (triggered = true);
    tryAndCatch(updateTriggered, "meow");
    expect(triggered).toBe(true);
  });
});
