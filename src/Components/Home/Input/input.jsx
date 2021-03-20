import React from "react";

const Input = (props) => {
    return (
        <section className="search-box">
            <input
                type="text"
                placeholder="Search for any country..."
                onChange={props.change}
            />
            <button onClick={props.click}>Search</button>
        </section>
    )
};

export default Input;