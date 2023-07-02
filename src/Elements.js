export default function Elements() {
    const todos = document.querySelector("#todos");
    const loading = document.querySelector("#loading");
    const input = document.querySelector("#input");
    const btn = document.querySelector("#btn");
    const checkboxes = document.querySelectorAll("label.checkbox-container");
    const linkFilters = document.querySelectorAll(".link-filter");
    const linkFilterAll = document.querySelector(".link-filter-all");
    const linkFilterComplete = document.querySelector(".link-filter-complete");
    const linkFilterUnComplete = document.querySelector(".link-filter-uncomplete");
    const todoElementTemplate = document.querySelector("#todo-element-template");


    return { todos, loading, input, btn, checkboxes, linkFilters, linkFilterAll, linkFilterComplete, linkFilterUnComplete, todoElementTemplate };
}