import { useState } from "react";
import ListItem from "./ListItem";
import { UserCircle, CaretLeft } from '@phosphor-icons/react';
import './navbar.css'

function Navbar() {
  const [listItems, setListItems] = useState([
    { id: 1, text: "Home", url: "/", isClicked: false },
    { id: 2, text: "Cadastros", url:"#", isClicked: false }
  ]);
  const [ activeMenuUser, setActiveMenuUser ] = useState(false);
  const [ activeBuguer, setActiveBurguer ] = useState(false);

  const handleClick = (itemId: number) => {
    const updatedListItems = listItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, isClicked: true };
      }
      return { ...item, isClicked: false };
    });

    setListItems(updatedListItems);
  };

  return (
    <div className="navbar">
      <div className="burguer" data-active={activeBuguer} onClick={() => setActiveBurguer(!activeBuguer)}>
          <div data-active={activeBuguer}></div>
      </div>
      <nav data-active={activeBuguer}>
          <ul>
              {listItems.map((item) => (
                  <ListItem
                  key={item.id}
                  itemId={item.id}
                  text={item.text}
                  url={item.url}
                  isClicked={item.isClicked}
                  onClick={handleClick}
                  />
              ))}
          </ul>
      </nav>
      <div className="info-user" onClick={() => setActiveMenuUser(!activeMenuUser)}>
              <UserCircle size={40} weight="fill" />
              <span>Miedson Fernandes</span>
              <CaretLeft size={18} weight="fill" data-active={activeMenuUser} />
      </div>
      <ul className="menu-user" data-active={activeMenuUser}>
          <li>Perfil</li>
          <li>Sair</li>
      </ul>
    </div>
  );
}

export default Navbar;
