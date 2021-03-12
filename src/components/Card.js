function Card(props) {

    function handleClick() {
        props.onCardClick(props.name, props.link);
      } 

    return (
            <li className="card">
                <img className="card__image" src={props.link} alt={props.name} onClick={handleClick}/>
                    <div className="card__info">
                        <h2 className="card__name">{props.name}</h2>
                        <div className="card__button-like-container">
                            <button type="button" className="card__button-like"></button>
                            <p className="likes-counter">{props.likes}</p>
                        </div>
                    </div>  
                    <button type="button" className="card__button-delete"></button>
            </li>
    );
  }
  
  export default Card;