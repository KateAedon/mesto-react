import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
   
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    
    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);
    
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name={"profile"} title={"Редактировать профиль"} buttonText={"Сохранить"}>
                 <input type="text" value={name} onChange={handleNameChange}
                             id="profile-form-name"
                             autoComplete="off"
                             required 
                             minLength="2"
                             maxLength="40"
                             className="form__input form__input_type_name" 
                             name="name" 
                             placeholder="Имя"/>
                     <span id="profile-form-name-error" className="error"></span>
                     <input type="text" value={description} onChange={handleDescriptionChange}
                             maxLength="200"
                             autoComplete="off"
                             className="form__input form__input_type_about" 
                             name="about"  
                             placeholder="О себе"/>
                     <span id="profile-form-description-error" className="error"></span>
         </PopupWithForm>
    );
  
}
  
  export default EditProfilePopup;