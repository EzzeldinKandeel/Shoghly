import React from 'react';
import { Link } from 'react-router-dom';

function ProfessionCards(props) {
    return (
        <div>
            <Link className='profession-card' to={`/professions/${props.professionEnglish}`}>
                <div>
                    {props.professionArabic}
                </div>
            </Link>
        </div>
    )
}

export default ProfessionCards;