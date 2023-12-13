import './message-box.css';
function MessageBox({text, isActive, updateStateMessageBox}: PropsMessage) {
    return (
        <div className="backdrop-message" data-action={isActive} >
            <div className="message-box">
                <h4>{text}</h4>
                <button onClick={() => updateStateMessageBox(false)}>OK</button>
            </div>
        </div>
    );
}

export default MessageBox;

type PropsMessage = {
    text: string;
    isActive: boolean;
    updateStateMessageBox: (newState: boolean) => void
}