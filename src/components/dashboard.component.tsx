import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export function DashboardComponent(props: { pages: Array<any>, user: any }) {
    return (
        <div className="Dashboard">
            <div className="greeting">Hi <span className="name">{props.user.name}</span>, here is your journal</div>
            <div className="pages">
                {
                    props.pages.map((page, index) => (
                        <Link to={"/" + page.dated} className="page" key={index}>
                            <div className="dated">
                                <div className="date">
                                    {moment(page.dated).format('DD')}
                                </div>
                                <div className="rest">
                                    {moment(page.dated).format('MMMM YYYY')}
                                </div>
                            </div>
                            <div className="title">
                                {page.title ? page.title : 'No Title'}
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}