/* eslint-disable no-case-declarations */

// State JSON structure
// {
//     wager: 20,
//     totalOdd: 1,
//     totalWin: 0,
//     bets: [
//     ],
// }
const initialData = {
    wager: 20,
    totalOdd: 1,
    totalWin: 0,
    bets: [
    ],
};

const ticketDataReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_OR_UPDATE_BET':
            const { fixtureId, home, away, date, betGroupName, oddId, oddName, odd } = action.payload;
            const existingBetIndex = state.bets.findIndex((bet) => bet.fixtureId === fixtureId);

            if (existingBetIndex !== -1) {
                // If an element with the same fixtureId exists, update its fields
                state.totalOdd = state.totalOdd * odd / state.bets[existingBetIndex].odd;
                state.totalWin = state.wager * state.totalOdd;
                state.bets[existingBetIndex].betGroupName = betGroupName;
                state.bets[existingBetIndex].oddName = oddName;
                state.bets[existingBetIndex].odd = odd;
            } else {
                // If no element with the specified fixtureId exists, add the new element
                state.totalOdd = state.totalOdd * odd;
                state.totalWin = state.wager * state.totalOdd;
                state.bets.push({
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

            state.totalOdd.toFixed(2);
            state.totalWin.toFixed(2);
            return { ...state };

        case 'REMOVE_BET':
            // Handle state updates for adding or updating a bet
            const { fixtureIdToRemove } = action.payload;
            // Use the filter method to create a new array without the element to be removed
            const updatedBets = [];
            let updatedTotalOdd = state.totalOdd;
            for (let i = 0; i < state.bets.length; i++) {
                const bet = state.bets[i];
                if (bet.fixtureId === fixtureIdToRemove) {
                    // Skip this bet and update the totalOdd and totalWin
                    updatedTotalOdd /= bet.odd;
                } else {
                    // Include this bet in the updatedBets array
                    updatedBets.push(bet);
                }
            }
            var updatedTotalWin = state.wager * updatedTotalOdd;
            return {
                ...state,
                totalOdd: updatedTotalOdd.toFixed(2),
                totalWin: updatedTotalWin.toFixed(2),
                bets: updatedBets, // Set the state.bets to the updated array
            };
        case 'UPDATE_WAGER':
            const newWager = action.payload;
            updatedTotalWin = newWager * state.totalOdd;

            return {
                ...state,
                wager: newWager,
                totalWin: updatedTotalWin.toFixed(2),
            };
        case 'PLAY_TICKET':
            return {
                ...state,
                totalWager:20,
                totalOdd: 1,
                totalWin: '-',
                bets: [], 
            };
        case 'UPDATE_INVALID_WAGER':
            updatedTotalWin = '-';

            return {
                ...state,
                totalWin: updatedTotalWin,
            };
        default:
            return state; // Return the current state if the action doesn't match any case
    }
};

export default ticketDataReducer;
