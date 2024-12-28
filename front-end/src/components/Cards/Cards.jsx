import React from "react";
import { cardItems } from "../../constants";
import CardItem from "./CardItem";

const Cards = () => {
    return (
        <div className="translate-all flex flex-wrap gap-3 p-4 duration-300 sm:px-7">
            {cardItems.map((item,index)=> (
                <CardItem item={item} key={index} />
            ))}
        </div>
    );
};

export default Cards;