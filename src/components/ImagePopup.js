function ImagePopup() {
    return (
        <section className="popup popup-image">
            <div className="popup-image__container">
                <img className="popup-image__image" src='https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' alt="изображение"/>
                <h2 className="popup-image__name">Новое место</h2>
                <button type="button" className="popup-image__close-button popup__close-button"></button>
            </div>
        </section>
    );
  }
  
  export default ImagePopup;