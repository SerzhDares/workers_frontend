export default class News {
    constructor() {
        // this.url = 'http://localhost:7070';
        this.url = 'https://workers-backend-6qsk.onrender.com';
        this.newsContainer = document.querySelector('.news_container');
    }

    init() {
        this.serviceWorkerChecking();
        this.refreshButton();
        setTimeout(() => this.requestToServer(), 5000);
    }

    async requestToServer() {
        try {
            const response = await fetch(this.url);
            const news = await response.json();
            this.newsContainer.innerHTML = '';
            this.newsViewer(news);
            console.log(news);
        } catch (error) {
            this.errorMarkingViewer();
            console.log(error);
        }
    }

    serviceWorkerChecking() {
        if('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js', { scope: './' })
            .then(reg => {
                console.log('Зарегистрирован: ' + reg.scope)
            }).catch(error => {
                console.log(error);
            });
        }
    }

    newsMarking(date, image, name, description) {
        return `<div class="news_item">
                    <span class="news_item_date">${date}</span>
                    <div class="news_item_description">
                        <div class="news_item_image">
                            <img class="image" src="${image}" alt="cinema">
                        </div>
                        <div class="news_item_text">
                            <span class="news_item_text-name">${name}</span>
                            <span class="news_item_text-desc">${description}</span>
                </div>`;
    }

    newsViewer(news) {
        news.forEach(item => {
            this.newsContainer.insertAdjacentHTML('beforeend', this.newsMarking(item.date, item.img, item.name, item.description));
        }) 
    }

    errorMarkingViewer() {
        this.newsContainer.insertAdjacentHTML('beforeend', 
            `<div class="error">
                <div class="error_msg">
                    Не удалось загрузить данные. Проверьте подключение и обновите страницу.
                </div>
            </div>`
        );
    }

    errorMarkingDelete() {
        if(document.querySelector('.error')) {
            document.querySelector('.error').remove();
        }
    }

    refreshButton() {
        document.querySelector('.news_window_refresh').addEventListener('click', () => {
            this.errorMarkingDelete();
            this.requestToServer();
        })
    }
}