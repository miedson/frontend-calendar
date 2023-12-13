import "./home.css";
import Navbar from "../../components/Navbar";
import CardMonth from "../../components/CardMonth";
import Select from "../../components/Form/Select";
import Button from "../../components/Form/Button";
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import AxiosAdapter from "../../infra/AxiosAdapter";
import CalendarGatewayHttp from "../../gateways/CalendarGatewayHttp";
import Month from "../../entities/Month";
import Event from '../../entities/Event';
import { v4 as uuidv4 } from "uuid";
import ClassificationGatewayHttp from "../../gateways/ClassificationGatewayHttp";
import Classification from '../../entities/Classification';
import Region from "../../entities/Region";
import RegionGatewayHttp from "../../gateways/RegionGatewayHttp";
import { OptionSelect } from '../../components/types';
import Filial from '../../entities/Filial';
import MessageBox from "../../components/MessageBox";
import TypeEvent from "../../entities/TypeEvent";
import TypesGatewayHttp from "../../gateways/TypesGatewayHttp";

function Home() {
  const [stateModal, setStateModal] = useState(false);
  const [stateRegions, setStateRegions] = useState<Region[]>([]);
  const [stateFiliais, setStateFiliais] = useState<Filial[]>([]);
  const [stateRegionSelected, setStateRegionSelected] = useState<Region>();
  const [stateFilialSelected, setStateFilialSelected] = useState<Filial>();
  const [stateDataModal, setStateDataModal] = useState<DataModal>({} as DataModal);
  const [stateClassifications, setClassifications] = useState<Classification[]>([]);
  const [stateCalendar, setCalendar] = useState<React.ReactElement[]>([]);
  const [stateOptionFiliais, setStateOptionFiliais] = useState<OptionSelect[]>([]);
  const [stateOptionRegion, setStateOptionRegion] = useState<OptionSelect[]>([]);
  const [stateMessageBox, setStateMessageBox] = useState(false);
  const [stateTypes, setStateTypes] = useState<TypeEvent[]>([]);
  const [stateTrocar, setStateTrocar] = useState(false);
  const httpClient = new AxiosAdapter();
  const env = import.meta.env;
  const getCalendar = async (region: number, filial: number) => {
    const dateNow = new Date();
    const calendar = new CalendarGatewayHttp(httpClient, env.VITE_BACKEND_URL);
    calendar.getCalendar(dateNow.getFullYear(), region, filial)
      .then(data => {
        const calendar: React.ReactElement[] = [];
        data.forEach((month: Month) => {
          calendar.push(<CardMonth key={uuidv4()} month={month} daysOfWeek={month.daysOfWeek} eventModal={() => setStateModal(!stateModal)} updateStateDataModal={updateStateDataModal} />) 
          setCalendar(calendar);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (stateCalendar.length === 0) {
      (
        async function(){
          getCalendar(stateRegionSelected?.id ?? 1, stateFilialSelected?.id ?? 1);
        }()
      );
    }
  }, [stateTrocar]);
  useEffect(() => {
    let isMounted = true;
    if(stateClassifications.length === 0) {
      const classifications = new ClassificationGatewayHttp(httpClient, env.VITE_BACKEND_URL);
      classifications.getClassifications()
      .then(data => {
        if(isMounted){
          setClassifications(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
    if (stateRegions.length === 0) {
      const regionHttp = new RegionGatewayHttp(httpClient, env.VITE_BACKEND_URL);
      regionHttp.getRegions()
        .then(data => {
          if (isMounted) {
            setStateRegions(data);
            const optionsRegion = data.map((region: Region) => ({description: region.name, value: region.id}));
            const filiaisFirstRegion = data.find((region: Region) => region.id === optionsRegion[0].value)?.getFiliaisRegion()
            const optionFiliais = filiaisFirstRegion?.map((filial: Filial) => ({description: filial.name, value: filial.code}));
            setStateOptionRegion(optionsRegion);
            setStateOptionFiliais(optionFiliais ?? []);
            setStateRegionSelected(data[0]);
            setStateFilialSelected(filiaisFirstRegion?.[0]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (stateTypes.length === 0) {
      const regionHttp = new TypesGatewayHttp(httpClient, env.VITE_BACKEND_URL);
      regionHttp.getTypes()
        .then(data => {
          if (isMounted) {
            setStateTypes(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [stateCalendar, stateModal, stateRegions]);
  
  const updateSelectFiliais = (id: number) => {
    const region = stateRegions.find((region: Region) => region.id === id);
    const filiais = region?.getFiliaisRegion() ?? [];
    const filiaisOption = (filiais.length > 0) ? filiais.map(filial => ({description: filial.name, value: filial.code})) : [{description: "Sem filial", value: undefined}];
    setStateFiliais(region?.getFiliaisRegion() ?? []);
    setStateOptionFiliais(filiaisOption);
    setStateRegionSelected(region);
    setStateFilialSelected(filiais[0]);
  };
  const selectFilial = (code: number) => {
    const filial = stateFiliais.find(filial => filial.code === code);
    setStateFilialSelected(filial);
  }
  const handleClickTrocar = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if(regionAndFilialIsSelected()) {
      updateStateMessageBox(true);
      return
    }
    await getCalendar(stateRegionSelected?.id ?? 1, stateFilialSelected?.id ?? 1);
    setStateTrocar(!stateTrocar);
  }
  const updateStateMessageBox = (newState: boolean) => {
    setStateMessageBox(newState);
  }
  const regionAndFilialIsSelected = () => {
    return ((stateRegionSelected === undefined && stateFilialSelected === undefined) || stateOptionRegion.length === 0 || stateOptionFiliais?.length === 0 || stateFilialSelected?.code === undefined)
  }
  const updateStateDataModal = (newState: any) => {
    setStateDataModal(newState);
  };
  const saveEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.parentElement as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    const event = new Event(formValues.title, formValues.description, stateRegionSelected?.id ?? 0, stateFilialSelected?.id ?? 0, stateDataModal.date, formValues.classification, formValues.type_event);
    const calendar = new CalendarGatewayHttp(httpClient, env.VITE_BACKEND_URL);
    await calendar.saveEvent(event);
    await getCalendar(stateRegionSelected?.id ?? 1, stateFilialSelected?.id ?? 1);
    setStateModal(false);
  }
  return (
    <main className="container">
      <Navbar></Navbar>
      <form className="form-filter">
        <div className="select-wrapper">
          <Select name="region" id="region" options={stateOptionRegion} onChangeEvent={updateSelectFiliais} />
        </div>
        <div className="select-wrapper">
          <Select name="filial" id="filial" options={stateOptionFiliais} onChangeEvent={selectFilial} />
        </div>
        <Button text="Trocar" onclickEvent={handleClickTrocar} />
      </form>
      <section className="subtitles">
        {
          stateClassifications.map((classification: Classification, index: number) => (
            <div key={index}>
              <div className="color" style={{borderColor: classification.color}}></div>
               <span>{classification.name}</span>
            </div>
          ))
        }
      </section>
      <section className="calendar">{stateCalendar.map((item) => item)}</section>
      <Modal data={stateDataModal} isOpen={stateModal} setStateModal={setStateModal} saveEvent={saveEvent} stateClassification={stateClassifications} typesEvent={stateTypes} />
      <MessageBox text="Verifique a região e filial selecionadas" isActive={stateMessageBox} updateStateMessageBox={updateStateMessageBox} />
    </main>
  );
}

export default Home;

type DataModal = {
    date: Date;
    events?: Event[];
}