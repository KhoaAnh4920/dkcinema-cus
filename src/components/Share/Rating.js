import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};
function Rating(props) {

    const [curValue, setCurValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0);

    const handleClick = value => {
        props.checkClick(value)
        setCurValue(value);
    }
    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };
    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    return (
        <>
            <div>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={15}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={(hoverValue || curValue) > index ? colors.orange : colors.grey}
                            style={{

                                marginRight: 5,
                                cursor: "pointer"
                            }}
                        />
                    )
                })}&nbsp;<span style={{ marginTop: '3px' }}>{curValue}/5</span>
            </div>
        </>
    );
}

export default Rating;