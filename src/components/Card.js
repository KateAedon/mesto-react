import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const userContext = React.useContext(CurrentUserContext);
    const isOwn = props.owner._id === userContext._id;
    
    const cardDeleteButtonClassName = (
        `card__button-delete ${isOwn ? 'card__button-delete-visible' : 'card__button-delete-hidden'}`
      ); 

    function handleClick() {
        props.onCardClick(props.name, props.link);
      } 

    return (
            <li className="card">
                <img className="card__image" src={props.link} alt={props.name} onClick={handleClick}/>
                    <div className="card__info">
                        <h2 className="card__name">{props.name}</h2>
                        <div className="card__button-like-container">
                            <button type="button" className="card__button-like"></button>
                            <p className="likes-counter">{props.likes}</p>
                        </div>
                    </div>  
                    <button type="button" className={cardDeleteButtonClassName}></button>
            </li>
    );
  }
  
  export default Card;