/* eslint-disable no-const-assign */
/* eslint-disable no-case-declarations */

// State JSON structure
// {
//     wager: 20,
//     totalOdd: 1,
//     totalWin: 0,
//     bets: [
//     ],
// }

// let currentFixtures;
// let currentSelectedLeagues;
// let currentTicketBets;
// let currentTotalOdds;
// let currentWager;
// let currentTotalWin;
// let currentErrors;


const globalStateReducer = (state, action) => {
    switch (action.type) {

        // Ticket action cases
        case 'ADD_OR_UPDATE_BET':
            const {
                fixtureId,
                home,
                away,
                date,
                betGroupId,
                betGroupName,
                oddId,
                oddName,
                odd
            } = action.payload;
            console.log("=====================================================")
            console.log(`ACTION: Adding/Updating bet for Fixture ID = ${fixtureId}`)

            // Clone the current ticket state to avoid modifying the state directly
            const updatedTicket = { ...state.ticket };

            const existingBetIndex = updatedTicket.bets.findIndex((bet) => bet.fixtureId === fixtureId);

            if (existingBetIndex !== -1) {
                // Update existing bet
                const currentBet = updatedTicket.bets[existingBetIndex];
                currentBet.betGroupId = betGroupId;
                currentBet.betGroupName = betGroupName;
                currentBet.oddId = oddId;
                currentBet.oddName = oddName;
                currentBet.odd = odd;
            } else {
                // Add new bet
                updatedTicket.bets.push({
                    fixtureId,
                    home,
                    away,
                    date,
                    betGroupId,
                    betGroupName,
                    oddId,
                    oddName,
                    odd,
                });
            }

            // Recalculate totalOdd and totalWin based on the updated bets
            updatedTicket.totalOdd = updatedTicket.bets.reduce((acc, bet) => acc * bet.odd, 1);
            updatedTicket.totalWin = updatedTicket.wager * updatedTicket.totalOdd;

            return {
                ...state,
                ticket: updatedTicket,
            };

        case 'REMOVE_BET':
            const { fixtureIdToRemove } = action.payload;
            console.log("=====================================================")
            console.log(`ACTION: Removing bet for Fixture ID = ${fixtureIdToRemove}`)

            // Use the filter method to create a new array without the element to be removed
            const updatedBets = state.ticket.bets.filter((bet) => bet.fixtureId !== fixtureIdToRemove);

            // Recalculate totalOdd and totalWin based on the updated bets
            const updatedTotalOdd = updatedBets.reduce((acc, bet) => acc * bet.odd, 1);
            const updatedTotalWin = state.ticket.wager * updatedTotalOdd;

            return {
                ...state,
                ticket: {
                    ...state.ticket,
                    bets: updatedBets,
                    totalOdd: updatedTotalOdd,
                    totalWin: updatedTotalWin,
                },
            };

        case 'UPDATE_WAGER':
            const newWager = action.payload;
            console.log("=====================================================")
            console.log(`ACTION: Updating wager to ${newWager}`)

            return {
                ...state,
                ticket: {
                    ...state.ticket,
                    totalWin: newWager * state.ticket.totalOdd,
                    wager: newWager,
                },
            };

        case 'RESET_TICKET':
            console.log("=====================================================")
            console.log(`ACTION: Reseting ticket`)
            return {
                ...state,
                ticket: {
                    wager: 20,
                    totalOdd: 1,
                    totalWin: 0,
                    bets: [
                    ],
                },
            };

        case 'UPDATE_INVALID_WAGER':
            console.log("=====================================================")
            console.log(`ACTION: Updating invalid wager`)
            return {
                ...state,
                ticket: {
                    ...state.ticket,
                    totalWin: 0
                }
            };

        // Fixutre action cases

        case 'ADD_FIXTURES':
            const { fixturesToAdd } = action.payload;
            console.log("=====================================================")
            console.log(`ACTION: Adding new Fixtures for League ID = ${fixturesToAdd.id}`)

            const currentFixtures = state.fixtures;
            currentFixtures.push(fixturesToAdd);

            return {
                ...state,
                fixtures: currentFixtures,
            };
        case 'REMOVE_FIXTURES':
            const { leagueId } = action.payload;
            console.log("=====================================================")
            console.log(`ACTION: Removing Fixtures for League ID = ${leagueId}`)

            const updatedFixtures = state.fixtures
                .filter((fixture) => fixture.id !== leagueId);

            return {
                ...state,
                fixtures: updatedFixtures
            };

        // League action cases
        case 'SET_LEAGUES':
            console.log("=====================================================")
            console.log(`ACTION: Setting leagues`)
            const { leagues } = action.payload;
            return {
                ...state,
                selectedLeagues: [leagues[0].id],
                leagues: leagues
            };

        case 'ADD_SELECTED_LEAGUE':
            const { selectedLeague } = action.payload;
            console.log("=====================================================")
            console.log(`ACTION: Adding League ID = ${selectedLeague} to Selected Leagues`)

            const currentSelectedLeagues = state.selectedLeagues
                .push(selectedLeague);

            return {
                ...state,
                selectedLeagues: [currentSelectedLeagues]
            };
        case 'REMOVE_SELECTED_LEAGUE':
            const { leagueToRemove } = action.payload;
            console.log("=====================================================")
            console.log(`ACTION: Removing League ID = ${leagueToRemove} from Selected Leagues`)

            const curtrentSelectedleagues = state.selectedLeagues
                .filter((id) => id !== leagueToRemove);

            return {
                ...state,
                selectedLeagues: [curtrentSelectedleagues]
            };

        // Error action cases
        case 'ADD_ERRORS':
            const { errorsToAdd } = action.payload;
            console.log("=====================================================")
            console.log(`ACTION: Adding Errors`)
            console.log(errorsToAdd)
            const updatedErrorsArray = [...state.errors, ...errorsToAdd];
            return {
                ...state,
                errors: updatedErrorsArray
            };
        case 'REMOVE_ERROR':
            console.log("=====================================================")
            console.log(`ACTION: Removing error`)
            const { index } = action.payload;
            const clonedErrors = [...state.errors];
            clonedErrors.splice(index, 1);
            return {
                ...state,
                errors: clonedErrors
            };

        default:
            return state; // Return the current state if the action doesn't match any case
    }
};

export default globalStateReducer;
