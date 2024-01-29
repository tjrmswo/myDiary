import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";
import styled from "styled-components";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increament</button>
      <button onClick={() => dispatch(decrement())}>Decreament</button>
    </div>
  );
};

export default Counter;
