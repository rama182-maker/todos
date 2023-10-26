import TodoForm from "../../components/TodoForm/TodoForm";

const TodoEdit = ({ setAddTodoFormVisible, value, setValue }) => {
  const onSubmit = () => {
    console.log("submitted");
  };

  return (
    <section className="container">
      <TodoForm
        edit={true}
        setAddTodoFormVisible={setAddTodoFormVisible}
        value={value}
        setValue={setValue}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default TodoEdit;
