import React from 'react';
import api from '../utils/api';
import Card from '../components/Card';

function Main(props) {

    const[userName, setUserName] = React.useState();
    const[userDescription, setUserDescription] = React.useState();
    const[userAvatar, setUserAvatar] = React.useState();
    const[cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api
        .getProfileInfo()
        .then(res => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
    })
    .catch((err) => {
        console.log(err)
    })
    }, [])

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

    return (
        <main className="content">
            <section className="profile">
              <div className="profile__image-container">
                    <img className="profile__image" src={`${userAvatar}`} alt="фото профиля"/>
                    <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}></button>
             </div>

                <div className="profile__info">
                    <div className="profile__text">
                    <h1 className="profile__name">{userName}</h1>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                <ul className="cards__list">
                    {cards.map((card, i) => {
                        return <Card
                                    card= {{card}} 
                                    name = {card.name} 
                                    link={card.link} 
                                    alt={card.alt}
                                    id={card._id} 
                                    likes={card.likes.length} 
                                    onCardClick={props.onCardClick} />
                    })}
                </ul>
            </section>
        </main>
    );
  }
  
  export default Main;