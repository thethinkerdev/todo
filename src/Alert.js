export default function Alert() {
    function create(title, message) {
        if (!title || !message) return;


        let mTop = 5;
        const element = document.querySelector('.alert');
        if (element) {
            mTop = element.clientHeight;
        }


        const alert = document.createElement('div');
        alert.className = `alert transition-all bg-blue-500 rounded shadow text-white text-right inline-flex items-center`;

        alert.style.direction = "rtl";
        alert.style.marginTop = `${mTop}px`;

        alert.innerHTML = `
        <i class="rounded-r px-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
    </i>


            <span class="p-2">
                <!-- title -->
                <div class="font-bold">${title}</div>
                <!-- body -->
                <p>${message}</p>
            </span>`;

        document.querySelector('.grid-alerts').append(alert);


        setTimeout(() => {
            alert.classList.add('alert-hide');
            
            alert.addEventListener('animationend', () => {
                alert.remove();
            })
        }, 3000)





    }
    return { create };
}