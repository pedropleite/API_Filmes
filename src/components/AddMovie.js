import React, { useRef } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
    const titleRef = useRef('');
    const openingTextRef = useRef('');
    const releaseDateRef = useRef('');

    function submitHandler(event) {
        event.preventDefault();

        const title = titleRef.current.value;
        const openingCrawl = openingTextRef.current.value;
        const releaseDate = releaseDateRef.current.value;

        if (title.trim().length === 0 || openingCrawl.trim().length === 0 || releaseDate.trim().length === 0) {
            alert('Please fill all fields');
            return;
        }

        const movie = {
            title: title,
            opening_crawl: openingCrawl,
            release_date: releaseDate,
        };

        props.onAddMovie(movie);
        titleRef.current.value = '';
        openingTextRef.current.value = '';
        releaseDateRef.current.value = '';
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={titleRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="opening-text">Opening Text</label>
                <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
            </div>
            <div className={classes.control}>
                <label htmlFor="date">Release Date</label>
                <input type="text" id="date" ref={releaseDateRef} />
            </div>
            <button>Add Movie</button>
        </form>
    );
}

export default AddMovie;
