import { Component } from 'react';
import globalStateReducer from '../../reducer/GlobalStateReducer';
import ErrorAlert from '../common/ErrorAlert';
import Leagues from './leagues/Leagues';
import leagueService from "../../service/LeagueService";
import LeaguesModal from './leagues/LeaguesModal';
import TicketModal from './ticket/TicketModal';
import Ticket from './ticket/Ticket';
import Fixtures from './fixtures/Fixtures';
import AuthService from '../../service/AuthService';
import { useNavigate } from 'react-router-dom';
import LeagueService from '../../service/LeagueService';

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
            errors: []
        };
    }

    componentDidMount() {
        console.log("Loading page..")
        this.loadData();
    }


    loadData() {
        leagueService.getAllLeagues(this.addLeagues, this.addError);
    }

    addLeagues = (data) => {
        console.log(data);
        if (data === null || data.length !== 0) {
            this.setState({
                leagues: data,
            });
            LeagueService.getFixturesForLeague(data[0].id, this.addFixtures, this.addError);
        } else {
            this.setState({
                leagues: [],
            });
        }
    };

    addFixtures(data) {
        console.log(data);
        if (data === null || data.fixtures.length !== 0) {
            this.dispatchAction({
                type: 'ADD_FIXTURES', // Specify the action type
                payload: {
                    fixturesToAdd: data.fixtures,
                    selectedLeague:data.id
                },
            })
            this.setState((prevState) => ({
                fixtures: [...prevState, data.fixtures],
                selectedLeagues: [...prevState, data.id],
            }));
        }
    }

    dispatchAction = (action) => {
        const updatedState = globalStateReducer(this.state, action);
        this.setState({ updatedState });
    }

    addError = (data) => {
        console.log(data)
        if (data.code !== null && data.code === "ERR_BAD_REQUEST"
            && data.response !== null && data.response.data !== null && data.response.data.error_message !== null
            && data.response.data.error_message.includes('The Token has expired on')) {
            AuthService.refreshToken(this.onRefreshTokenExpired);
        }
        if (data === null || data.errorMessages.length === 0) {
            this.setState((prevState) => ({
                errors: [...prevState.errors, "Unknown error"],
            }))
        } else {
            this.setState((prevState) => ({
                errors: [...prevState.errors, data.errorMessages],
            }));
        }
    };

    onRefreshTokenExpired = (data) => {
        console.log("Refresh token has expired: ")
        console.log(data)
        useNavigate("/login")
    }

    removeError = (index) => {
        this.setState((prevState) => {
            const updatedErrors = [...prevState.errors];
            updatedErrors.splice(index, 1);
            return { errors: updatedErrors };
        });
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
        const { errors } = this.state;
        return (
            <div className={"unselectable-text row min-vh-md-100"}>
                <div className="error-container">
                    {errors.map((error, index) => (
                        <ErrorAlert key={index} error={error} removeError={() => this.removeError(index)} />
                    ))}
                </div>
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
                        onClose={this.handleCloseLeaguesModal} />
                </div>
                <div className={`col-12 col-md-3 d-none d-md-block`}>
                    <Leagues
                        action={this.dispatchAction}
                        allLeagues={this.state.leagues}
                        selectedLeagues={this.state.selectedLeagues} />
                </div>
                <div className={`col-12 col-md-6 min-vh-50`}>
                    <Fixtures
                        action={this.dispatchAction}
                        fixtureData={this.state.fixtures}
                        onError={this.addError} />
                </div>
                <div className="col-12 d-md-none" >
                    <TicketModal
                        show={this.state.showTicketModal}
                        onClose={this.handleCloseTicketModal}
                        onError={this.addError}
                        action={this.dispatchAction}
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
