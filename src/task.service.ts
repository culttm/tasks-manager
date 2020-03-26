import axios from 'axios'

export class TaskService {
    private static url = 'https://tasks-80f77.firebaseio.com/';

    constructor() {}

    async load(): Promise<{}> {
        const { data } = await axios.get(TaskService.url + 'tasks.json');
        return data
    }

    async create(options: any): Promise<{}> {

        const task = {
            title: options.title,
            description: 'lol'
        };

        const {data} = await axios.post(TaskService.url + 'tasks.json', task);
        return {...data, ...task}
    }
}
