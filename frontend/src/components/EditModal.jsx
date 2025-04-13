import { ChangeEvent, FormEvent, useState, Dispatch, SetStateAction } from "react";

import { useTodo } from "../context/TodoContextProvider";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditModal = ({ editModal, oldTodo, setEditModal }) => {
  const [loading, setLoading] = useState(false);
  const { editTodo } = useTodo();

  const [todo, setTodo] = useState({
    content: oldTodo.content,
    title: oldTodo.title,
    completed: oldTodo.completed,
  });

  const formik = useFormik({
    initialValues: {
      title: todo.title,
      content: todo.content,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .required("Title is required"),
      content: Yup.string()
        .min(5, "Content must be at least 5 characters")
        .required("Content is required"),
    }),
    onSubmit: async () => {
      setLoading(true);
      await editTodo({
        title: todo.title,
        content: todo.content,
        completed: todo.completed,
        _id: oldTodo._id,
      });
      setLoading(false);
      setEditModal(false);
    },
    enableReinitialize: true,
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
  };

  if (!editModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="todo-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            name="title"
            id="todo-title"
            type="text"
            value={todo.title}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            className="my-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-sm text-red-500">{formik.errors.title}</div>
          )}
          <label htmlFor="todo-content" className="block text-sm font-medium mt-4 text-gray-700 dark:text-gray-300">
            Task
          </label>
          <textarea
            name="content"
            id="todo-content"
            value={todo.content}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            className="my-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-sm text-red-500">{formik.errors.content}</div>
          )}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={!formik.isValid || loading}
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 disabled:opacity-50"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => {
                setEditModal(false);
                setTodo({
                  title: oldTodo.title,
                  content: oldTodo.content,
                  completed: oldTodo.completed,
                });
                formik.resetForm();
              }}
              className="ml-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
