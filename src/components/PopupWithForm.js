function PopupWithForm(props) {
    return (
        <section className={`popup popup-${props.name}`}>
            <div className={`popup__container popup-${props.name}__container`}>
                <form className={`form form-${props.name}`} name="delete-card" noValidate>
                    <button className="popup__close-button" type="button"></button>
                    <h1 className="popup__heading">{props.title}</h1>
                    {props.children}
                    <button type="button" className={`form__${props.name}-button form__save-button`}>{props.buttonText}</button>
                </form>
            </div>
        </section> 
    );
  }
  
  export default PopupWithForm;