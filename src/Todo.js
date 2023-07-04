
import DOM from "./DOM.js";
import Elements from "./Elements.js";
import Storage from "./Storage.js";


const { renderData } = DOM();
const { loading, input, btn } = Elements();
const storage = Storage();
export default function Todo() {

    let json;

    async function loadData() {
        loading.style.display = "block";
        const response = await fetch('https://jsonplaceholder.ir/todos');
        json = await response.json();
        loading.style.display = "none";

        console.log(json);
        return json;
    }

    async function remove(id, todos) {

        let shallowCopy = [...todos];

        loading.style.display = "block";

        const response = await fetch(`https://jsonplaceholder.ir/todos/${id}`, {
            method: 'DELETE',
            body: {
                id: id
            }
        });

        loading.style.display = "none";

        shallowCopy = shallowCopy.filter(t => t.id !== id)

        return shallowCopy;

    }

    function create(title) {
        storage.set("items", { id: Date.now().toString(), title, iscomplete: false });
    }

    function update(id, title, data) {
        storage.update("items", id, { title: title });

        btn.textContent = "Submit";
    }

    return { loadData, remove, update, create };
}