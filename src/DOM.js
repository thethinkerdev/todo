import Alert from "./Alert.js";
import Elements from "./Elements.js";
import Storage from "./Storage.js";
import Todo from "./Todo.js";

const { todos: todosList, btn, input, form, checkboxes } = Elements();
const { remove } = Todo();
const storage = Storage();
const alert = Alert();

export default function DOM() {


    function renderData(todos) {
        todosList.innerHTML = '';

        for (let todo of todos) {

            const todoElement = document.createElement('div')

            todoElement.className = "flex flex-col space-y-4 sm:flex-row items-center justify-between bg-fuchsia-500 p-3 rounded-2xl shadow shadow-fuchsia-600";

            todoElement.innerHTML = `<label class="checkbox-container inline-flex items-center space-x-3 relative">
            <input class="checkbox-input w-0 h-0 opacity-0" type="checkbox">
            <span
                class="absolute checkbox-checkmark cursor-pointer flex justify-center items-center w-4 h-4 rounded bg-white"></span>
            <span class="pl-5 checkbox-value select-none text-fuchsia-100">${todo.title}</span>
        </label>

        <div class="flex space-x-5">
            <i class="edit-action cursor-pointer bg-blue-500 text-white rounded-full px-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </i>

            <i class="delete-action cursor-pointer bg-rose-500 text-white rounded-full px-2 py-1 delete-action-${todo.id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </i>
        </div>
`;

            todoElement.dataset.todoId = todo.id;

            todoElement.querySelector('input').checked = todo.iscomplete;

            todoElement.querySelector("input[type=checkbox]").addEventListener('change', (e) => {
                storage.update("items", todo.id, { iscomplete: !todo.iscomplete })
            })

            todoElement.querySelector('.edit-action').addEventListener('click', () => {
                input.value = todo.title;
                btn.textContent = "Edit";

                input.dataset.idTodo = todo.id;
                input.dataset.prevValue = todo.title;

                alert.create("موفقیت آمیز", "تسک مورد نظر را ویرایش نمایید");

                // GO To Form Section to Edit Todo
                scrollTo(0, 0)
            });

            todoElement.querySelector(".delete-action").addEventListener('click', (e) => {
                alert.create("موفقیت آمیز", "تسک مورد نظر حذف شد");

                storage.remove("items", todo.id);

                renderData(storage.get("items"));
            });


            todosList.append(todoElement);
        }
    }
    return { renderData };
}