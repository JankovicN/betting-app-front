/* eslint-disable no-case-declarations */

// State JSON structure
// {
//     wager: 20,
//     totalOdd: 1,
//     totalWin: 0,
//     bets: [
//     ],
// }


const globalStateReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_OR_UPDATE_BET':
            const { fixtureId, home, away, date, betGroupName, oddId, oddName, odd } = action.payload;
            const existingBetIndex = state.bets.findIndex((bet) => bet.fixtureId === fixtureId);
            // Updated bets is set to current bets that are in ticket, it will be changed in the following
            let currentTicketBets = state.bets;
            let currentTotalOdds = state.totalOdd;
            let currentWager = state.wager;
            let currentTotalWin = state.totalWin;

            if (existingBetIndex !== -1) {
                // If an element with the same fixtureId exists, update its fields
                let currentBet = currentTicketBets[existingBetIndex];
                currentTotalOdds = currentTotalOdds * odd / currentBet.odd;
                currentTotalWin = currentWager * currentTotalOdds;
                currentBet.betGroupName = betGroupName;
                currentBet.oddName = oddName;
                currentBet.odd = odd;
            } else {
                // If no element with the specified fixtureId exists, add the new element
                currentTotalOdds = currentTotalOdds * odd;
                currentTotalWin = currentWager * currentTotalOdds;
                currentTicketBets.push({
                    fixtureId,
                    home,
                    away,
                    date,
                    betGroupName,
                    oddId,
                    oddName,
                    odd,
                });
            }


            return {
                ...state,
                bets: currentTicketBets,
                wager: currentWager,
                totalWin: currentTotalWin,
            };

        case 'REMOVE_BET':
            // Handle state updates for adding or updating a bet
            const { fixtureIdToRemove } = action.payload;
            // Use the filter method to create a new array without the element to be removed
            currentTicketBets = [];
            var updatedTicketBets = state.totalOdd;
            currentTicketBets = state.bets;
            currentTotalOdds = state.totalOdd;
            for (let i = 0; i < currentTicketBets.length; i++) {
                const bet = currentTicketBets[i];
                if (bet.fixtureId === fixtureIdToRemove) {
                    // Skip this bet and update the totalOdd and totalWin
                    currentTotalOdds /= bet.odd;
                } else {
                    // Include this bet in the updatedBets array
                    updatedTicketBets.push(bet);
                }
            }
            currentTotalWin = state.wager * currentTotalOdds;
            return {
                ...state,
                totalOdd: currentTotalOdds,
                totalWin: currentTotalWin,
                bets: updatedTicketBets, // Set the state.bets to the updated array
            };

        case 'UPDATE_WAGER':
            const newWager = action.payload;
            currentTotalWin = newWager * state.totalOdd;

            return {
                ...state,
                wager: newWager,
                totalWin: currentTotalWin,
            };

        case 'PLAY_TICKET':
            return {
                ...state,
                totalWager: 20,
                totalOdd: 1,
                totalWin: 0,
                bets: [],
            };

        case 'UPDATE_INVALID_WAGER':
            currentTotalWin = 0;

            return {
                ...state,
                totalWin: currentTotalWin,
            };
        default:
            return state; // Return the current state if the action doesn't match any case
    }
};

export default globalStateReducer;
