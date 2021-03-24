import React from 'react';
import Header from './Header';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

    const[isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const[isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const[isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const[selectedCard, setSelectedCard] = React.useState({name: ' ', link: ' ', alt: ' ', isOpen: false});
    const[currentUser, setCurrentUser] = React.useState([]);

    React.useEffect(() => {
        api
        .getProfileInfo()
        .then(res => {
            setCurrentUser(res)
    })
    .catch((err) => {
        console.log(err)
    })
    }, [])


    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }
    
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({name: ' ', link: ' ', alt: ' ', isOpen: false});
    }

    function handleCardClick(name, link) {
        setSelectedCard({name: name, link: link, alt: name, isOpen: true});
    }

    function handleUpdateUser(data) {
        api
        .saveProfileInfo(data)
        .then(data => {
            setCurrentUser(data)
            closeAllPopups()
    })
    .catch((err) => {
        console.log(err)
    })
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick}
            />
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <PopupWithForm name={"card"} title={"Новое место"} buttonText={"Создать"} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
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
         </PopupWithForm>
         <PopupWithForm name={"confirm"} title={"Вы уверены?"} buttonText={"Да"}/>
         <PopupWithForm name={"avatar"} title={"Обновить аватар"} buttonText={"Сохранить"}  isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
                <input type="url" 
                     id="avatar-form-link"
                     autoComplete="off"
                     className="form__input_type_link form__input" 
                     name="avatar" 
                     defaultValue="" 
                     placeholder="" 
                     required/>
                 <span id="avatar-form-link-error" className="error"></span> 
        </PopupWithForm>
        <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;