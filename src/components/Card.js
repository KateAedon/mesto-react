import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
   
    const cardDeleteButtonClassName = (
        `card__button-delete ${isOwn ? 'card__button-delete-visible' : 'card__button-delete-hidden'}`
      );
    const cardLikeButtonClassName = (
        `card__button-like ${isLiked ? 'card__button-like_active' : 'card__button-like'}`);

    function handleClick() {
        props.onCardClick(props.name, props.link);
      } 

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
            <li className="card">
                <img className="card__image" src={props.link} alt={props.name} onClick={handleClick}/>
                    <div className="card__info">
                        <h2 className="card__name">{props.name}</h2>
                        <div className="card__button-like-container">
                            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                            <p className="likes-counter">{props.card.likes.length}</p>
                        </div>
                    </div>  
                    <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            </li>
    );
  }
  
  export default Card;