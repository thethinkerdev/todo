import Alert from "./Alert.js";
import DOM from "./DOM.js";
import Elements from "./Elements.js";
import Todo from "./Todo.js";
import Storage from "./Storage.js";

const { update, create } = Todo();
const { btn, input } = Elements();
const { renderData } = DOM();
const alert = Alert();
const storage = Storage();



(() => {

    renderData(storage.get("items"));
    alert.create("اطلاعات", "دریافت اطلاعات با موفقیت انجام شد");


    btn.addEventListener('click', (e) => {
        const inputDataset = input.dataset;
        const btnTextContent = btn.textContent;


        if (btnTextContent === "Submit Edit") {
            const { idTodo } = inputDataset;
            if (update(idTodo, input.value)) {
                renderData(storage.get("items"));
                alert.create("موفقیت آمیز", "تسک مورد نظر با موفقیت ویرایش شد");
            }


        } else {
            create(input.value);
            if (renderData(storage.get("items"))) {
                alert.create("موفقیت آمیز", "تسک مورد نظر با موفقیت ایجاد شد");
            }


        }


        input.value = '';
        loading.style.display = "none";


    })

})();