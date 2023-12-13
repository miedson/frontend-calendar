import { Link } from "react-router-dom";

function ListItem({ itemId, text, url, isClicked, onClick }: PropsListItem) {
  const handleClick = () => {
    onClick(itemId);
  };

  return (
    <li data-active={isClicked} onClick={handleClick}>
      <Link data-active={isClicked} to={url}>{text}</Link>
    </li>
  );
}

type PropsListItem = {
  itemId: number;
  isClicked?: boolean;
  onClick: (itemId: number) => void;
  text: string;
  url: string
};

export default ListItem;
