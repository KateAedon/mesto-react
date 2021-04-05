import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Header from './Header';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import api, { Api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

    const[isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const[isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const[isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const[selectedCard, setSelectedCard] = React.useState({name: ' ', link: ' ', alt: ' ', isOpen: false});
    const[currentUser, setCurrentUser] = React.useState([]);
    const[cards, setCards] = React.useState([]);


    React.useEffect((res) => {
        api
        .getProfileInfo(res)
        .then(res => {
            setCurrentUser(res)
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
    
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            const newCards = cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard)
            setCards(newCards);
        })
    } 

    function handleCardDelete(card) { 
        api
        .deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter((e => e._id !== card._id)))
    })
        .catch((err) => {
            console.log(err)
    })
    }

    function handleUpdateAvatar(data) {
        api
        .saveAvatar(data.avatar)
        .then((data) => {
            setCurrentUser(data)
            closeAllPopups()
    })
    .catch((err) => {
        console.log(err)
    })
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

    function handleAddPlaceSubmit(data) {
        api
        .addCard(data)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups()
    })
    .catch((err) => {
        console.log(err)
    })
    }

    const handleRegister = ({ email, password }) => {
        console.log({ email, password })
        return api
                .register({ email, password })
                .then((res) => {
          if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
          return res;
        })
        .catch()
      }
    

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header />
        <Switch>
            <ProtectedRoute
                path="/main"
                
                component={Main}
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick}
                onCardLike ={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
            />
            <Route path="/sign-in">
                <Login />
            </Route>
            <Route path="/sign-up">
                <div className="register__container">
                    <Register onRegister={handleRegister}/>
                </div>
            </Route>
        </Switch>
        <ImagePopup 
            onClose={closeAllPopups} 
            card={selectedCard}/>
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}/>
         <AddPlacePopup
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}/>
         <PopupWithForm 
            name={"confirm"} 
            title={"Вы уверены?"} 
            buttonText={"Да"}/>
         <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar} />
        <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;