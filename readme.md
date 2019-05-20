register to site
  register.html
  enter values into form, upon BUTTON post form into users db
    FORM 
      fields -> email, password, card number (xxxx-xxxx), starting amount (max xxxxx INT type)
    USERS DB
      id, email, password, numcard, balance
  reload to login.html

log in to account
  login.html
  require form to be filled
  upon BUTTON check users db, if 1 > reload to index.html, else post msg "user not found"

index.html
  log out, list of items enlisted from items db, user can click on the image to zoom it in
    ITEMS DB
      id, name, description, price
  each item has + && - button, if + > add to price field on top left corner, if - subtract from price field on top left corner (can't be lower than 0)
  when BUTTON check if user has enough balance if 1 > reload index.html msg "success, thanks for shopping with us" && send mail && withdraw balance from the user, else msg "insufficient balance"
  top left corner picture of a card -> card.html

card.html
  deposit balance in field
  upon button OK update USERS DB (balance)



bootstrap

register.html
login.html
index.html
card.html

users db
items db

register.html send data to db (index.html)
login.html check data from db (0 login.html; 1 index.html)




image zoom
  js
  class