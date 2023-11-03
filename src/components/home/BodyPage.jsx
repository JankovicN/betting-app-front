import { Component } from 'react';
import globalStateReducer from '../../reducer/GlobalStateReducer';
import ErrorAlert from '../common/ErrorAlert';
import Leagues from './leagues/Leagues';
import Fixtures from './fixtures/Fixtures';
import LeaguesModal from './leagues/LeaguesModal';
import TicketModal from './ticket/TicketModal';
import Ticket from './ticket/Ticket';

const initialData = {
    wager: 20,
    totalOdd: 1,
    totalWin: 0,
    bets: [
    ],
};

class Body extends Component {
    constructor(props) {
        super(props);
        // Define your initial state here
        this.state = {
            leagues: [],
            selectedLeagues: [],
            fixtures: [],
            ticket: initialData,
            showLeaguesModal: false,
            showTicketModal: false,
            error: null
        };
    }

    dispatchAction = (action) => {
        const updatedState = globalStateReducer(this.state, action);
        this.setState({ updatedState });
    }

    // Lifecycle method to trigger actions when the component is mounted
    componentDidMount() {
        // Example: You can call a method to load data or trigger actions on component mount
        this.loadData();
    }

    showError = (data) => {
        console.log(data)
        if (data.data === null || data.data.data.data.errorMessages.length === 0) {
            this.setState({ error: "Unknown error" })
        } else {
            this.setState({ error: data.data.errorMessages[0] })
        }
    };

    clearError = () => {
        this.setState({ error: null })
    }

    // Example method to load data or perform actions on component mount
    loadData() {
        // Simulate an API call or any other asynchronous action
        // eslint-disable-next-line react-hooks/rules-of-hooks

        setTimeout(() => {
            this.updateGlobalData('Data loaded from the server');
        }, 1000);
    }

    handleShowLeaguesModal = () => {
        console.log("Opening leagues modal: " + this.state.showLeaguesModal);
        this.setState({ showLeaguesModal: true });
    };

    handleCloseLeaguesModal = () => {
        console.log("Closing leagues modal: " + this.state.showLeaguesModal);
        this.setState({ showLeaguesModal: false });
    };

    handleShowTicketModal = () => {
        console.log("Opening tickets modal: " + this.state.showTicketModal);
        this.setState({ showTicketModal: true });
    };

    handleCloseTicketModal = () => {
        console.log("Closing tickets modal: " + this.state.showTicketModal);
        this.setState({ showTicketModal: false });
    };

    render() {
        // You can pass the state and methods to child components as props
        return (
            <div className={"unselectable-text row min-vh-md-100"}>
                {this.state.error && <ErrorAlert message={this.state.error} onClose={this.clearError} />}
                <div className="col-12 mb-2">
                    <div className="row">
                        <div className="col-6 d-md-none" >
                            <button className="w-100 button default_padding_px" onClick={this.handleShowLeaguesModal}>Show Leagues</button>
                        </div>
                        <div className="col-6 d-md-none" >
                            <button className="w-100 button default_padding_px" onClick={this.handleShowTicketModal}>Show Ticket</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-md-none" >
                    <LeaguesModal show={this.state.showLeaguesModal}
                        action={this.dispatchAction}
                        allLeagues={this.state.leagues}
                        selectedLeagues={this.state.selectedLeagues}
                        onClose={this.handleCloseLeaguesModal}
                        showError={this.showError} />
                </div>
                <div className={`col-12 col-md-3 d-none d-md-block`}>
                    <Leagues
                        action={this.dispatchAction}
                        allLeagues={this.state.leagues}
                        selectedLeagues={this.state.selectedLeagues}
                        showError={this.showError} />
                </div>
                <div className={`col-12 col-md-6 min-vh-50`}>
                    <Fixtures
                        action={this.dispatchAction}
                        fixtureData={this.state.fixtures} />
                </div>
                <div className="col-12 d-md-none" >
                    <TicketModal
                        show={this.state.showTicketModal}
                        onClose={this.handleCloseTicketModal}
                        onError={this.showError} action={this.dispatchAction}
                        ticketData={this.state.ticket} />
                </div>
                <div className={`col-12 col-md-3 d-none d-md-block`}>
                    <Ticket
                        action={this.dispatchAction}
                        ticketData={this.state.ticket} />
                </div>
            </div >
        );
    }
}

export default Body;
