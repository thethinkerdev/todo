
import Alert from "./Alert.js";
import DOM from "./DOM.js";
import Elements from "./Elements.js";
import Storage from "./Storage.js";


const { renderData } = DOM();
const { loading, input, btn, label } = Elements();
const storage = Storage();
const alert = Alert();

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


    function validateString(label, value) {
        const valueFormatted = value.trim();

        if (valueFormatted == "") {
            alert.create("ناموفق", `${label} آیتم را وارد نمایید`, "bg-rose-500");
            return 0;
        }

        if (valueFormatted.length < 5) {
            alert.create("ناموفق", `${label} طولانی‌تری را وارد نمایید!`, "bg-rose-500");
            return 0;
        }

        return 1;
    }
    function create(title) {

        if (validateString("عنوان", title)) {
            storage.set("items", { id: Date.now().toString(), title, iscomplete: false });
            return 1;
        }

    }

    function update(id, title) {

        if (validateString("عنوان", title)) {
            storage.update("items", id, { title: title });

            btn.textContent = "Submit";
            label.textContent = "Add New";

            return 1;
        }
    }

    return { loadData, remove, update, create };
}