function ImagePopup(props) {

    return (
        <section className={`popup popup-image ${props.card.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup-image__container">
                <img className="popup-image__image" src={props.card.link} alt={props.card.name} />
                <h2 className="popup-image__name">{props.card.name}</h2>
                <button type="button" className="popup-image__close-button popup__close-button" onClick={props.onClose}></button>
            </div>
        </section>
    );
  }
  
  export default ImagePopup;