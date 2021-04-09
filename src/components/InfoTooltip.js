import React from 'react';

function InfoTooltip(props) {
 
  return (
            <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
                <div className="popup__container">
                    <form className="form popup__status form-confirm" name="success" novalidate>
                        <button className="popup-confirm__close-button popup__close-button" onClick={props.onClose} type="button"></button>
                        <img className="popup__status-image" src={props.src} alt={props.status} />
                        <h1 className="popup__heading popup-status__heading">{props.title}</h1>
                    </form>
                </div>
            </div> 
  )
}

export default InfoTooltip;