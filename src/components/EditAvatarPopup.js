import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
   
    const avatarRef = React.useRef();
    
     function handleSubmit(e) {
        e.preventDefault();      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      }

    return (
        <PopupWithForm 
        name={"avatar"} 
        title={"Обновить аватар"} 
        buttonText={"Сохранить"}  
        isOpen={props.isOpen} 
        onClose={props.onClose}
        onSubmit={handleSubmit} >
            <input type="url"
                ref={avatarRef} 
                id="avatar-form-link"
                autoComplete="off"
                className="form__input_type_link form__input" 
                name="avatar" 
                defaultValue="" 
                placeholder="" 
                required/>
            <span id="avatar-form-link-error" className="error"></span> 
        </PopupWithForm>
    );
  
}
  
  export default EditAvatarPopup;