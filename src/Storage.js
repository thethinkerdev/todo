export default function Storage() {
    const namespace = "todos";

    function setForce(name, value) {
        const fullName = `${namespace}.${name}`;

        const shallowCopy = [...get(name)];

        console.log(shallowCopy);
    }
    function set(name, value) {
        const fullName = `${namespace}.${name}`;

        if (localStorage.getItem(fullName)) {
            let shallowCopy = JSON.parse(localStorage.getItem(fullName));

            shallowCopy = [value, ...shallowCopy];

            localStorage.setItem(fullName, JSON.stringify(shallowCopy));
        } else {

            localStorage.setItem(fullName, JSON.stringify([value]));
        }
    }

    function update(name, uniqueValue, newValue) {
        const fullName = `${namespace}.${name}`;
        let shallowCopy = [...JSON.parse(localStorage.getItem(fullName))];

        shallowCopy = shallowCopy.map((item) => {
            if (item.id == uniqueValue) {
                return {
                    ...item,
                    ...newValue
                }
            }
            return item;
        });

        localStorage.setItem(fullName, JSON.stringify(shallowCopy));
    }
    function get(name) {
        return JSON.parse(localStorage.getItem(`${namespace}.${name}`)) ?? [];
    }

    function remove(name, uniqueValue) {
        const fullName = `${namespace}.${name}`;

        let shallowCopy = [...JSON.parse(localStorage.getItem(fullName))];

        shallowCopy = shallowCopy.filter((item) => {
            if (item.id == uniqueValue) {
                return false;
            }
            return true;
        });

        localStorage.setItem(fullName, JSON.stringify(shallowCopy));
    }



    return { set, get, remove, update };
}