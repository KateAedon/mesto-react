import React from 'react';
import api from '../utils/api';

function Main(props) {

    const[userName, setUserName] = React.useState();
    const[userDescription, setUserDescription] = React.useState();
    const[userAvatar, setUserAvatar] = React.useState();

    React.useEffect(() => {
        api
        .getProfileInfo()
        .then(res => {
            console.log(res, "res");
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
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
                    <template className="card-template">
                        <li className="card">
                            <img className="card__image" src='https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' alt="изображение"/>
                            <div className="card__info">
                                <h2 className="card__name"></h2>
                                <div className="card__button-like-container">
                                    <button type="button" className="card__button-like"></button>
                                    <p className="likes-counter">0</p>
                                </div>
                            </div>  
                            <button type="button" className="card__button-delete"></button>
                        </li>
                    </template>
                </ul>
            </section>
        </main>
    );
  }
  
  export default Main;