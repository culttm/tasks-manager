import { TaskService } from './task.service'


class App {

    private _tasks: any[] = [];
    markup: string;
    private list: HTMLElement;
    private input: HTMLInputElement;
    private button: HTMLButtonElement;


    constructor(
        private selector: string,
        private readonly taskService: TaskService
    ) {

        this.markup = `
            <div>
                <input id="input" type="text">
                <button id="send">Send</button>
                <ul id="list"></ul>
            </div> 
        `
    }

    static serialize(tasks: {[key: string]: any}): any[] {
        return Object.keys(tasks).map(_task => ({
            id: _task,
            ...tasks[_task]
        }))
    }

    async run(): Promise<void> {
        document.querySelector<HTMLElement>(this.selector).innerHTML = this.markup;

        this.setupListeners();

        const tasks = await this.taskService.load();

        this._tasks = tasks ? App.serialize(tasks) : []

        this.render()

    }

    setupListeners(): void {
        this.input = document.querySelector('#input');
        this.button = document.querySelector('#send');
        this.list = document.querySelector('#list')

        this.button.addEventListener('click', async () => {
            const res: any = await this.taskService.create({title: this.input.value})
            this._tasks.push({
                id: res.name,
                title: res.title,
                description: res.description,
            });
            this.render()
        })
    }

    render(): void {
        this.list.innerHTML = '';
        this._tasks.forEach(_task => {
            this.list.innerHTML += `<li data-task="${_task.id}" id="${_task.id}">
                <div><b>${_task.id}</b></div>
                <div>${_task.title}</div>
                <div>${_task.description}</div>
            </li>`
        })
    }
}

const app = new App('#app', new TaskService());

app.run();
