import React, { FormEvent, useState, useEffect } from 'react';
import { ApiService } from '../services/api.service';
import { Link, Redirect } from 'react-router-dom';

import saveIcon from '../save-24.png';
import { history } from '../config/history';
import moment from 'moment';

const apiService = new ApiService();

export function TodayComponent(props: { today: any, pages: Array<any>, setIsLoading: Function, setPages: Function, match: any }) {
    const { dated } = props.match.params;

    const [page, setPage] = useState(props.pages.find(page => page.dated === dated));

    if (!props.today) {
        return <Redirect to="/" />;
    }

    if (!dated) {
        return <Redirect to="/" />;
    }

    if (!page) {
        return <Redirect to="/" />;
    }

    const isEditable = props.today.dated === page.dated;



    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isEditable) {
            return;
        }
        const form = event.target as any;
        const payload = {
            title: form.title.value,
            content: form.content.value
        };
        props.setIsLoading(true);
        apiService.savePage(payload)
            .then(response => {
                const  oldPages = [...props.pages];
                const newPage = response.data.page;
                const pageIndex = oldPages.find(o => o.dated === newPage.dated);
                oldPages.splice(pageIndex, 1, newPage);
                setPage(props.pages.find(page => page.dated === dated));
                props.setPages(oldPages);
            })
            .catch(err => {

            })
            .finally(() => {
                props.setIsLoading(false);
            });
    }

    return (
        <div className="Today">
            <form onSubmit={submit}>
                <input
                    name="title"
                    type="text"
                    placeholder={isEditable ? "Enter Title..." : "No Title"}
                    autoComplete="off"
                    defaultValue={(isEditable ? '' : moment(page.dated).format('DD MMMM YYYY') + ' - ' ) + page.title}
                    readOnly={isEditable ? false : true}
                    style={{
                        cursor: isEditable ? 'text' : 'default'
                    }}
                />
                <textarea
                    name="content"
                    placeholder={isEditable ? "Write something about today..." : "Oops, looks like you did not share anything on this day!"}
                    defaultValue={page.content}
                    readOnly={isEditable ? false : true}
                    style={{
                        cursor: isEditable ? 'text' : 'default'
                    }}
                ></textarea>
                {
                    isEditable ?
                        <button type="submit" className="submit">
                            <img src={saveIcon} alt="" />
                        </button> :
                        ''
                }
                <Link to="/" className="close">&times;</Link>
            </form>
        </div>
    );
}