function PopupWithForm(props) {
    return (
        <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup-${props.name}__container`}>
                <form className={`form form-${props.name}`} name="delete-card" noValidate onSubmit={props.onSubmit}>
                    <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                    <h1 className="popup__heading">{props.title}</h1>                       
                            {props.children}
                    <button type="submit" className={`form__${props.name}-button form__save-button`}>{props.buttonText}</button>
                </form>
            </div>
        </section> 
    );
  }
  
  export default PopupWithForm;