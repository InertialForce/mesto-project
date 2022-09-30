export default class Card {
  constructor(item, selector, idUser, {handleCardClick, handlePutLikeCard, handleDeleteLikeCard, handleDeleteCard}) {
    this._link = item.link;
    this._name = item.name;
    this._cardId = item._id;
    this._cardLike = item.likes;
    this._selector = selector;
    this._cardOwnerId = item.owner._id;
    this._idUser = idUser;
    this._handleCardClick = handleCardClick;
    this._handlePutLikeCard = handlePutLikeCard;
    this._handleDeleteLikeCard = handleDeleteLikeCard;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _cardDeleteButton() {
    this._handleDeleteCard(this._cardId, this._deleteButton);
  }

  _setDeleteButtons(){
    if (this._idUser === this._cardOwnerId){
      this._deleteButton.classList.add('card__delete-button_visible');
    }
  }

  _cardLikeButton(evt) {
    if (this._likeButton.classList.contains('card__like-button_active')) {
      this._handleDeleteLikeCard(evt, this._cardId, this._element);
    }
    if (!this._likeButton.classList.contains('card__like-button_active')) {
      this._handlePutLikeCard(evt, this._cardId, this._element);
    }
  }

  _setLikeButtons() {
    this._cardLike.forEach(element => {
      if (element._id === this._idUser){
        this._likeButton.classList.add('card__like-button_active');
      }
    });
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })

    this._likeButton.addEventListener('click', (evt) => {
      this._cardLikeButton(evt);
    })

    this._deleteButton.addEventListener('click', () => {
      this._cardDeleteButton();
    })
  }

  generate() {
    this._element = this._getElement();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__heading').textContent = this._name;
    this._element.querySelector('.card__like-count').textContent = this._cardLike.length;

    this._setDeleteButtons();
    this._setLikeButtons();
    this._setEventListeners();

    return this._element;
  }

}
