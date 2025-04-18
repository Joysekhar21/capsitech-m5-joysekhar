import Todo from './Todo'
import { SkeletonDemo } from "./SkeletonDemo";
import { useTodo } from "../context/TodoContextProvider";



const TodoMap = ( {todos} ) => {

  const { loading } = useTodo();
  return (
    <div className="flex flex-col gap-4 pt-4 p-2">
      {loading ? (
        <SkeletonDemo />
      ) : todos.length !== 0 ? (
            todos.map((todo, index) => {
              return <Todo todo={todo} key={index} />;
            })
      ) : (
        <span>No Tasks !</span>
      )}
    </div>
  );
};

export default TodoMap;