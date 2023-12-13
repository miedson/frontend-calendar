import Event from '../../entities/Event';
import "./modal.css";
import Select from "../Form/Select";
import Text from "../Form/Text";
import Label from "../Form/Label/Label";
import Button from "../Form/Button";
import Classification from '../../entities/Classification';
import TypeEvent from '../../entities/TypeEvent';

function Modal({data, isOpen, setStateModal, saveEvent, stateClassification, typesEvent} : PropsModal) {
  if(!isOpen) return null;
  const day = data.date.getDate();
  const month = data.date.getMonth()+1;
  const year = data.date.getFullYear();
  const classifications = stateClassification.map((classification: Classification) => ({description: classification.name, value: classification.id}));
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    saveEvent(e);
  }
  const typesOption = typesEvent.map((type: TypeEvent) => ({description: type.type, value: type.id}));
  return (
    <div className="backdrop">
      <div className="modal">
        <button type="button" className="modal-close" onClick={() => setStateModal(false)} />
        <section className="form-modal">
        <h3>{`${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`}</h3>
        <form>
          <div className="input-wrapper">
          <Label labelFor="title">Titulo</Label>
          <Text name="title" id="title" />
          </div>
          <div className="input-wrapper">
          <Label labelFor="description">Descrição</Label>
          <Text name="description" id="description" />
          </div>
          <div className="input-wrapper">
          </div>
          <div className="input-wrapper">
          <Label labelFor="classification">Classificação</Label>
          <Select name="classification" id="classification" options={classifications}></Select>
          </div>
          <div className="input-wrapper">
          <Label labelFor="type_event">Tipo</Label>
          <Select name="type_event" id="type_event" options={typesOption}></Select>
          </div>
          <Button text="Salvar" onclickEvent={handleClick} />
        </form>
        </section>
        {
          data?.events && data.events.length > 0 && 
          <section className="events-modal">
         {
          data?.events?.map((event, index) => (
            <div className="event-modal" key={index}>
              <h3>{event.title}</h3>
              <span>{`${event.type_event} ${event.classification}`}</span>
              <p>{event.description}</p>
            </div>
          ))
         }
        </section>
        }
      </div>
    </div>
  );
}

type PropsModal = {
    data: {
      date: Date;
      events?: Event[];
    };
    isOpen: boolean;
    setStateModal: (isOpen: boolean) => void;
    saveEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
    stateClassification: Classification[];
    typesEvent: TypeEvent[];
}

export default Modal;
