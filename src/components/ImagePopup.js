function ImagePopup(props) {

    return (
        <section className={`popup popup-image ${props.card ? 'popup_opened' : ''}`}>
            <div className="popup-image__container">
                <img className="popup-image__image" src={props.link} alt="изображение" />
                <h2 className="popup-image__name">Новое место</h2>
                <button type="button" className="popup-image__close-button popup__close-button" onClick={props.onClose}></button>
            </div>
        </section>
    );
  }
  
  export default ImagePopup;