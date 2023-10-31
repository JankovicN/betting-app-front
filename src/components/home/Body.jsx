import { TicketProvider } from "../../context/TicketContext";
import Fixtures from "./fixtures/Fixtures";
import Leagues from "./leagues/Leagues";
import LeaguesModal from "./leagues/LeaguesModal";
import Ticket from "./ticket/Ticket";
import { useState } from 'react';
import TicketModal from "./ticket/TicketModal";


const Body = () => {
    const [showLeaguesModal, setShowLeaguesModal] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);

    const handleShowLeaguesModal = () => {
        console.log("Opening leagues modal: "+showLeaguesModal );
        setShowLeaguesModal(true);
    };

    const handleCloseLeaguesModal = () => {
        console.log("Closing leagues modal: "+showLeaguesModal );
        setShowLeaguesModal(false);
    };

    const handleShowTicketModal = () => {
        console.log("Opening tickets modal: "+showTicketModal );
        setShowTicketModal(true);
    };

    const handleCloseTicketModal = () => {
        console.log("Closing tickets modal: "+showTicketModal );
        setShowTicketModal(false);
    };


    return (
        <div className={"unselectable-text row min-vh-md-100"}>
            <div className="col-12 mb-2">
                <div className="row">
                    <div className="col-6 d-md-none" >
                        <button className="w-100 button default_padding_px" onClick={handleShowLeaguesModal}>Show Leagues</button>
                    </div>
                    <div className="col-6 d-md-none" >
                        <button className="w-100 button default_padding_px" onClick={handleShowTicketModal}>Show Ticket</button>
                    </div>
                </div>
                <div className="col-12 d-md-none" >
                    <LeaguesModal show={showLeaguesModal} onClose={handleCloseLeaguesModal} />
                </div>
            </div>
            <div className={`col-12 col-md-3 d-none d-md-block`}>
                <Leagues />
            </div>
            <TicketProvider>
                <div className="col-12 d-md-none" >
                <TicketModal show={showTicketModal} onClose={handleCloseTicketModal} />
                </div>
                <div className={`col-12 col-md-6 min-vh-50`}>
                    <Fixtures />
                </div>
                <div className={`col-12 col-md-3 d-none d-md-block`}>
                    <Ticket />
                </div>
            </TicketProvider >
        </div >
    );
};

export default Body;