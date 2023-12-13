import "../form.global.css";

function Button({text, onclickEvent}: PropsButton) {
  return (
    <button className="button" onClick={onclickEvent}>{text}</button>
  );
}

type PropsButton = {
    text: string;
    onclickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default Button;
