import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
   

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    
    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();  
        props.onAddPlace({
          name: name, 
          link: link
        });
        setName('')
        setLink('')
      } 
    
    return (
        <PopupWithForm 
            name={"card"} 
            title={"Новое место"} 
            buttonText={"Создать"} 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit} >
                         <input type="text"
                            value={name}
                            onChange={handleNameChange}
                            id="card-form-name"
                            autoComplete="off" 
                            minLength="2"
                            maxLength="30"
                            className="form__input_type_place form__input" 
                            name="name" 
                            placeholder="Название" 
                            required/>
                     <span id="card-form-name-error" className="error"></span>
                     <input type="url"
                            value={link} 
                            onChange={handleLinkChange}
                             id="card-form-link"
                             autoComplete="off"
                             className="form__input_type_link form__input" 
                             name="link" 
                             placeholder="Ссылка на картинку" 
                             required/>
                     <span id="card-form-link-error" className="error"></span>
         </PopupWithForm>
    ); 
}
 
export default AddPlacePopup;