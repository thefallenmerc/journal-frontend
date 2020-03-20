import React, { FormEvent, useState } from 'react';
import { ApiService } from '../services/api.service';
import { history } from '../config/history';

export function LoginComponent(props: { setIsLoading: Function }) {

    const apiService = new ApiService();

    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);

    const LOADING = {
        start: () => {
            props.setIsLoading(true);
            setErrors({});
            setMessage(null);
        },
        stop: (message = '', errors = {}) => {
            props.setIsLoading(false);
            setErrors(errors);
            setMessage(message);
        }
    }

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as any;
        const credentials = {
            email: form.email.value,
            password: form.password.value
        }
        LOADING.start();
        apiService.login(credentials)
            .then(response => {
                props.setIsLoading(false);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                history.push('/');
            })
            .catch(err => {
                if ('response' in err) {
                    const { response } = err;
                    if (response.status === 422) {
                        LOADING.stop(response.data.message, response.data.errors);
                    }
                }
            })
    };
    return (
        <div className="Login">
            <form onSubmit={submit}>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Email" />
                    <Error errors={errors} name="email" />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" />
                    <Error errors={errors} name="password" />
                </div>
                <div className="text-center">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}


function Error(props: { errors: any, name: string }) {
    return (
        <div className="form-error">
            {
                props.errors && (props.name in props.errors) ? props.errors[props.name][0] : ''
            }
        </div>
    )
}