/* eslint-disable jsx-a11y/iframe-has-title */
import React, {Component, useState} from 'react';
import shortid from 'shortid';
import './App.css';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

const displayDate = (number, titles) => {
  const cases = [2, 0, 2, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

const minutes = ["минута", "минуты", "минут"];
const hours = ["час", "часа", "часов"];
const days = ["день", "дня", "дней"];

const MIN = 1000 * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;  

const withHOC = (Component) => {
    return class extends React.Component {
        getRelativeTime = () => {
            const currentDate = new Date();
            const componentDate = new Date(this.props.date);
            const timeDiff = currentDate - componentDate;

            const minsDiff = Math.floor(timeDiff / MIN);
            const hoursDiff = Math.floor(timeDiff / HOUR);
            const daysDiff = Math.floor(timeDiff / DAY);

            if (hoursDiff < 1) {
            return `${minsDiff} ${displayDate(minsDiff, minutes)} назад`;
            } else if (daysDiff < 1) {
            return `${hoursDiff} ${displayDate(hoursDiff, hours)} назад`;
            }
            return `${daysDiff} ${displayDate(daysDiff, days)} назад`;
        };

        render() {
            const { date } = this.props;
            return <Component date={this.getRelativeTime(date)} />;
        }
    };
};

const DateTimePretty = withHOC(DateTime);


function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video key={shortid.generate()} url={item.url} date={item.date} />);
}

export default function App() {
    const [list] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-08-01 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}