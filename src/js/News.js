export default class News {
    constructor() {

    }

    init() {
        this.serviceWorkerChecking();
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
}