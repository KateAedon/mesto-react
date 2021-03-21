import React from 'react';
import api from '../utils/api';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const[cards, setCards] = React.useState([]);
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        api
        .getInitialCards()
        .then(cards => {
            setCards(cards)
    })
    .catch((err) => {
        console.log(err)
    })
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    } 



    return (
        <main className="content">
            <section className="profile">
              <div className="profile__image-container" onClick={props.onEditAvatar}>
                    <img className="profile__image" src={`${currentUser.avatar}`} alt="фото профиля"/>
                    <button type="button" className="profile__avatar-button" ></button>
             </div>

                <div className="profile__info">
                    <div className="profile__text">
                    <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                <ul className="cards__list">
                    {cards.map((card) => 
                            <Card   
                                    card={card}
                                    key={card._id} 
                                    name = {card.name} 
                                    link={card.link} 
                                    alt={card.name}
                                    owner={card.owner._id}
                                    onCardClick={props.onCardClick}
                                    onCardLike ={handleCardLike}
                                    />
                    )}
                </ul>
            </section>
        </main>
    );
  }
  
  export default Main;