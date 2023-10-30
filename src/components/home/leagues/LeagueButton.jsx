import PropTypes from 'prop-types';
import { useState } from 'react';


const LeagueButton = ({ league, updateLeagues }) => {
    const initialButtonCssClass = league.isSelected ? "button_selected" : "button_not_selected";
    const [clickButtonCssClass, updateButtonCssClass] = useState(initialButtonCssClass);


    const selectLeague = () => {
        {console.log("league:" + league.id)}
        {console.log("league name is:" + league.name)}
        updateLeagues(league.id);
        if (league.isSelected) {
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
};

export default LeagueButton;