import { useDispatch, useSelector } from "react-redux";
import { AppState, AppDispatch } from "../../store";
import { increment, decrement } from "../../store/counter.reducer";

const Counter = () => {
  const count = useSelector((state: AppState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <div>Counter</div>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment Counter
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        Decrement Counter
      </button>
      <p>Counter value {count}</p>
    </div>
  );
};

export default Counter;
