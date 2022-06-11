import React, { useState } from 'react';

const star = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Rate() {
    const [rate, setRate] = useState(null);
    const [hoverRate, setHoverRate] = useState(null);
    return (
        <>
            <div className='stars'>
                {
                    star.map(rate =>
                        <i
                            key={rate}
                            class={"fas fa-star"
                                + ((rate <= setRate) ? 'in-rate' : '')
                                + ((rate <= hoverRate) ? 'in-hover' : '')}
                            onClick={() => setRate(rate)}></i>)
                }
            </div>
        </>
    )
}
export default Rate;