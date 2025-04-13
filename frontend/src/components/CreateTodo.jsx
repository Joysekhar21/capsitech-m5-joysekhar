import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {useFormik} from "formik"
import * as Yup from "yup"
import { useTodo } from "../context/TodoContextProvider";

export default function CreateTodo() {
  const [loading, setLoading] = useState(false);
  const { createTodo, createModal, setCreateModal } = useTodo();
  const modalRef = useRef(null);
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    completed: false,
  });

  const formik = useFormik({
    initialValues: { title: todo.title, content: todo.content },
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
      await createTodo(todo);
      setTodo({ title: "", content: "", completed: false });
      setLoading(false);
    },
    enableReinitialize: true,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value); 
  };


  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") setCreateModal(false);
    }

    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setCreateModal(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCreateModal]);

  if (!createModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="bg-white dark:bg-slate-900 rounded-lg shadow-lg w-full max-w-md p-6 dark:selection:bg-slate-800 selection:bg-gray-300"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Create Task</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your tasks so that you don't forget any of them.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="create-title" className="text-sm font-medium">
            Title
          </label>
          <input
            name="title"
            id="create-title"
            type="text"
            className="my-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800 text-black dark:text-white"
            value={todo.title}
            onChange={handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-sm text-red-500">{formik.errors.title}</div>
          )}
          <label htmlFor="create-content" className="text-sm font-medium mt-2 block">
            Task
          </label>
          <textarea
            name="content"
            id="create-content"
            className="my-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800 text-black dark:text-white"
            value={todo.content}
            onChange={handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-sm text-red-500">{formik.errors.content}</div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50 dark:bg-white dark:text-black"
              disabled={
                loading || !formik.isValid
              }
            >
              Create
            </button>
            <button
              type="button"
              className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md"
              onClick={() => {
                setCreateModal(false);
                setTodo({
                  title: "",
                  completed: false,
                  content: "",
                });
                formik.resetForm();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
