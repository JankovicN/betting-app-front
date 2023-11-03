import PropTypes from 'prop-types';
import { useState } from 'react';


const LeagueButton = ({ league, updateLeagues, selectedLeagues }) => {
    const initialButtonCssClass = selectedLeagues.includes(league.id) ? "button_selected" : "button_not_selected";
    const [clickButtonCssClass, updateButtonCssClass] = useState(initialButtonCssClass);


    const selectLeague = () => {
        { console.log(`Selecting League ${league.name}, id = ${league.id}`) }
        updateLeagues(league.id);
        if (clickButtonCssClass === "button_not_selected") {
            // Add the league to selectedLeagues if selected is true
            updateButtonCssClass("button_selected");
        } else {
            // Remove the league from selectedLeagues if selected is false
            updateButtonCssClass("button_not_selected");
        }
    }

    return (
        <button className={`button text-start default_padding_px p-3 fs-5 ${clickButtonCssClass}`} onClick={() => selectLeague()}>
            {league.name}
        </button >
    );
};

LeagueButton.propTypes = {
    league: PropTypes.object.isRequired,
    updateLeagues: PropTypes.func.isRequired,
    selectedLeagues: PropTypes.array.isRequired,
};

export default LeagueButton;