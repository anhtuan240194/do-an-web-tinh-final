const getTodos = async () => {
    const res = await axios.get("/api/todos");

    return res.data;
};

const createTodo = async (title) => {
    const res = await axios.post("/api/todos", { title });

    return res.data;
};

const updateTodo = async (todo) => {
    const res = await axios.put(`/api/todos/${todo.id}`, {
        title: todo.title,
        completed: todo.completed,
    });

    return res.data;
};

const renderTodos = async () => {
    const todos = await getTodos();

    const $todoList = $(".todo-list");

    const $items = $.map(todos, (todo) => {
        const $item = $(`<li class="list-group-item">
              <input
                  class="form-check-input me-1"
                  type="checkbox"
                  ${todo.completed ? "checked" : ""}
                  id="todo-${todo.id}"
              />
              <label class="form-check-label" for="todo-${todo.id}"
                  >${todo.title}</label
              >
          </li>`);

        $(`#todo-${todo.id}`, $item).on("change", (e) => {
            e.preventDefault();

            updateTodo({
                ...todo,
                completed: e.target.checked,
            }).then(() => {
                renderTodos();
            });
        });

        return $item;
    });

    $todoList.empty();
    $todoList.append($items);
};

// Ready
$(function () {
    $(".todo-form").on("submit", (e) => {
        e.preventDefault();
        const $input = $("#title");

        const title = $input.val();

        createTodo(title).then(() => {
            $input.val("");
            renderTodos();
        });
    });

    renderTodos();
});
