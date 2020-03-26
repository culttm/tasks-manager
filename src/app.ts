interface IOptions {
    selector: string
}

class App {

    private selector: string;

    constructor(options: IOptions) {
        this.selector = options.selector
    }

    run(): void {
        document.querySelector<HTMLElement>(this.selector).innerText = 'RUN!'
    }
}

const app = new App({
    selector: '#app'
});

app.run()

