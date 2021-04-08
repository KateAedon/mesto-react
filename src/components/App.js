import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
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
import api from '../utils/api';
import * as auth from '../utils/auth.js';
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

    const [userData, setUserData] = useState({
        email: '',
        password: ''
      })

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = React.useState('');
    const history = useHistory();

    useEffect(() => {
        tokenCheck()
      }, [])
    
      useEffect(() => {
        if (loggedIn) {
          history.push("/main");
        }
      }, [loggedIn])
    
    const tokenCheck = () => {
        if (localStorage.getItem('token')) {
          let token = localStorage.getItem('token');
          auth
          .checkToken(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              history.push('/')
              setEmail(res.data.email);
            }
          })
          .catch((err) => console.log(err));
      }
    }  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header loggedIn={loggedIn} isLoggedIn={setLoggedIn} email={email}/>
        <Switch>
            <ProtectedRoute
                exact = 'exact'
                path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick}
                onCardLike ={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
            />
            <Route exact path="/sign-in">
                <div className="account__container">
                    <Login  isLoggedIn={setLoggedIn}/>
                </div>
            </Route>
            <Route exact path="/sign-up">
                <div className="account__container">
                    <Register />
                </div>
            </Route>
            <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
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
        {loggedIn && <Footer />}
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;