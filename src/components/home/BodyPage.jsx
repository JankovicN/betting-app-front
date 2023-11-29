import { Component } from 'react';
import globalStateReducer from '../../reducer/GlobalStateReducer';
import ErrorAlert from '../common/ErrorAlert';
import Leagues from './leagues/Leagues';
import leagueService from "../../service/LeagueService";
import LeaguesModal from './leagues/LeaguesModal';
import TicketModal from './ticket/TicketModal';
import Ticket from './ticket/Ticket';
import Fixtures from './fixtures/Fixtures';
import LeagueService from '../../service/LeagueService';
import { isAuthenticated } from '../../util/auth';
import PropTypes from 'prop-types';

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
        this.setIsAuthenticated = props.setIsAuthenticated;

        this.state = {
            leagues: undefined,
            selectedLeagues: [],
            fixtures: [],
            ticket: initialData,
            showLeaguesModal: false,
            showTicketModal: false,
            errors: []
        };


        this.addFixtures = this.addFixtures.bind(this);
    }

    componentDidMount() {
        isAuthenticated()
            .then((result) => {
                if (result) {
                    this.loadData();
                } else {
                    this.setIsAuthenticated(false);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    loadData() {
        leagueService.getAllLeagues(this.addLeagues, this.onErrror);
    }

    addLeagues = (data) => {
        if (data !== undefined && data.data !== undefined && data.data.data !== undefined && data.data.data.length !== 0) {
            this.dispatchAction({
                type: 'SET_LEAGUES', // Specify the action type
                payload: {
                    leagues: data.data.data,
                },
            })
            LeagueService.getFixturesForLeague(data.data.data[0].id, this.addFixtures, this.onErrror);
        } else {
            this.setState({
                leagues: [],
            });
        }
    };

    addFixtures(data) {
        if (data !== undefined && data.data !== undefined && data.data.data !== undefined && data.data.data.length !== 0) {
            this.dispatchAction({
                type: 'ADD_FIXTURES', // Specify the action type
                payload: {
                    fixturesToAdd: data.data.data,
                },
            })
        }
    }

    dispatchAction = (action) => {
        console.log("=====================================================")
        console.log("Current state:")
        console.log(this.state)
        const updatedState = globalStateReducer(this.state, action);
        this.setState(updatedState);
        console.log("=====================================================")
        console.log("Updated state:")
        console.log(updatedState)
    }

    onErrror = (data) => {
        console.log("Error data:")
        console.log(data)
        if (data.response !== undefined && JSON.stringify(data.response).includes('The Token has expired')) {
            this.setIsAuthenticated(false)
        } else if (data.code !== undefined && data.code === 'ERR_NETWORK') {
            this.addError("Cannot connect to server at this time.\nTry again later");
            this.setIsAuthenticated(false)
        } else if (data.response !== undefined && data.response.data !== undefined && data.response.data.errorMessages !== undefined) {
            this.addError(data.response.data.errorMessages);
        }

    }

    addError = async (data) => {
        this.dispatchAction({
            type: 'ADD_ERRORS', // Specify the action type
            payload: {
                errorsToAdd: data
            },
        })

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Use async/await to pause execution without blocking the entire app
        await delay(3000);

        this.dispatchAction({
            type: 'REMOVE_ERROR',
            payload: {
                errorMessages: data
            },
        });
    };

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
            <div className={"unselectable-text row min-vh-md-100 p-md-2"}>

                <ErrorAlert errorMessages={this.state.errors} />
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
                        onError={this.onErrror} />
                </div>
                <div className={`col-12 col-md-3 d-none d-md-block`}>
                    <Leagues
                        action={this.dispatchAction}
                        allLeagues={this.state.leagues}
                        selectedLeagues={this.state.selectedLeagues}
                        onError={this.onErrror} />
                </div>
                <div className={`col-12 col-md-6 min-vh-50`}>
                    <Fixtures
                        action={this.dispatchAction}
                        fixtureData={this.state}
                        onError={this.onErrror} />
                </div>
                <div className="col-12 d-md-none" >
                    <TicketModal
                        show={this.state.showTicketModal}
                        onClose={this.handleCloseTicketModal}
                        onError={this.onErrror}
                        action={this.dispatchAction}
                        ticketData={this.state.ticket} />
                </div>
                <div className={`col-12 col-md-3 d-none d-md-block`}>
                    <Ticket
                        action={this.dispatchAction}
                        ticketData={this.state.ticket}
                        onError={this.onErrror} />
                </div>
            </div >
        );
    }
}

Body.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define the 'history' prop
};

export default Body;
