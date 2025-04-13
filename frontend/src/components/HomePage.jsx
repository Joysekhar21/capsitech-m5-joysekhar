import TodoMap from "./TodoMap";
import { useEffect } from "react";
import { useTodo } from "../context/TodoContextProvider";
import { ModeToggle } from "./ModeToggle";
import AvatarButton from "./AvatarButton";
import CreateTodo from "./CreateTodo";
import Login from "./Login";
import SignUp from "./SignUp";
import { useUser } from "../context/UserContextProvider";

const HomePage = () => {
  const { todos, fetchTodos, setCreateModal, loading } = useTodo();
  const { setIsLoggedIn, setLoginModal } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("todo-accessToken");
    if (!token) {
      setIsLoggedIn(false);
      return setLoginModal(true);
    }
    setIsLoggedIn(true);
    fetchTodos();
  }, []);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const progressPercent = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  console.log(todos)
  todos.forEach((todo, i) => {
    console.log(`Todo #${i + 1} completed:`, todo.completed);
  });
  return (
    <main className="dark:selection:bg-slate-800 selection:bg-gray-300">
      <ModeToggle />
      <AvatarButton />
      <CreateTodo />
      

      <div className="w-full 2xl:p-16 xl:p-16 lg:p-16 md:p-10 p-6">
        <h1 className="text-4xl my-6 2xl:my-0 2xl:text-5xl xl:my-0 xl:text-5xl lg:text-5xl lg:my-0 md:text-5xl md:my-2">
          My Todos
        </h1>

        
        <div className="mb-6 mt-6">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Progress Bar</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
            <div
              className="h-full bg-black dark:bg-white transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 ">
        <p>Total Todos : <span className="font-semibold">{totalTodos}</span></p>
        <p>Completed Todos : <span className="font-semibold">{completedTodos}</span></p>
      </div>

        </div>

        

        <ul className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-8 pt-4">
          {/* Assigned Todos */}
          <li className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
            <h2 className="2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl text-xl">
              Assigned Todos
            </h2>
            <TodoMap todos={todos.filter((todo) => !todo.completed)} />
            <button
              onClick={() => setCreateModal(true)}
              className="ml-2 mt-4 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md hover:opacity-90 transition disabled:opacity-50 selection:text-black dark:selection:text-white"
              disabled={loading}
            >
              Create Task
            </button>
          </li>

          {/* Completed Todos */}
          <li className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
            <h2 className="2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl text-xl">
              Completed
            </h2>
            <TodoMap todos={todos.filter((todo) => todo.completed)} />
          </li>
        </ul>
      </div>
    </main>
  );
};

export default HomePage;
