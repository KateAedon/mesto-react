import PopupWithForm from './PopupWithForm';

function Main() {

    function handleEditAvatarClick() {
        document.querySelector('.popup-avatar').classList.add('popup_opened');
    }

    function handleEditProfileClick() {
        document.querySelector('.popup-profile').classList.add('popup_opened');
    }
    
    function handleAddPlaceClick() {
        document.querySelector('.popup-card').classList.add('popup_opened');
    }


    return (
        <main className="content">
            <section className="profile">
              <div className="profile__image-container">
                    <img className="profile__image" src="<%=require('./images/profile__image.png')%>" alt="фото профиля"/>
                    <button type="button" className="profile__avatar-button" onClick={handleEditAvatarClick}></button>
             </div>

                <div className="profile__info">
                    <div className="profile__text">
                        <h1 className="profile__name">Жак-Ив Кусто</h1>
                        <p className="profile__description">Исследователь океана</p>
                    </div>
                    <button type="button" className="profile__edit-button" onClick={handleEditProfileClick}></button>
                </div>
                <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}></button>
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

        <PopupWithForm name={"profile"} title={"Редактировать профиль"} buttonText={"Сохранить"} children={[
           <>
                <input type="text"
                            id="profile-form-name"
                            autoComplete="off"
                            required 
                            minLength="2"
                            maxLength="40"
                            className="form__input form__input_type_name" 
                            name="name" 
                            defaultValue="Жак-Ив Кусто" 
                            placeholder="Имя"/>
                    <span id="profile-form-name-error" className="error"></span>
                    <input type="text"
                            id="profile-form-description" 
                            required
                            minLength="2"
                            maxLength="200"
                            autoComplete="off"
                            className="form__input form__input_type_about" 
                            name="about" 
                            defaultValue="Исследователь океана" 
                            placeholder="О себе"/>
                    <span id="profile-form-description-error" className="error"></span>
            </>
        ]}/>
        <PopupWithForm name={"card"} title={"Новое место"} buttonText={"Создать"} children={[
                <>
                        <input type="text"
                            id="card-form-name"
                            autoComplete="off" 
                            minLength="2"
                            maxLength="30"
                            className="form__input_type_place form__input" 
                            name="name" 
                            defaultValue="" 
                            placeholder="Название" 
                            required/>
                    <span id="card-form-name-error" className="error"></span>
                    <input type="url" 
                            id="card-form-link"
                            autoComplete="off"
                            className="form__input_type_link form__input" 
                            name="link" 
                            defaultValue="" 
                            placeholder="Ссылка на картинку" 
                            required/>
                    <span id="card-form-link-error" className="error"></span>
                    </>
                ]}/>

        <PopupWithForm name={"confirm"} title={"Вы уверены?"} buttonText={"Да"}/>
        <PopupWithForm name={"avatar"} title={"Обновить аватар"} buttonText={"Сохранить"} children={[
           <>
                <input type="url" 
                    id="avatar-form-link"
                    autoComplete="off"
                    className="form__input_type_link form__input" 
                    name="avatar" 
                    defaultValue="" 
                    placeholder="" 
                    required/>
                <span id="avatar-form-link-error" className="error"></span> 
            </>
        ]}/>
        </main>
    );
  }
  
  export default Main;