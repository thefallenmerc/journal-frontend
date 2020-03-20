import axios from 'axios';

const base = 'http://localhost:8000/api'

export class ApiService {
    login(credentials: { email: string, password: string }) {
        return axios.post(base + '/login', credentials, {
            headers: {
                Accept: 'application/json'
            }
        });
    }

    getPages() {
        return axios.get(base + '/pages', {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            }
        });
    }

    savePage(payload: {title: string, content?: string}) {
        return axios.post(base + '/pages', payload, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            }
        });
    }
}