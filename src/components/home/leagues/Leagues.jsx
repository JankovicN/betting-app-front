
import { useRef } from "react";
import LeagueButton from "./LeagueButton";
import classes from "./Leagues.module.css";
import Line from "../../common/Line";

const leagueArray = [
    {
        id: 1,
        name: "Premier League",
        isSelected: true,
    },
    {
        id: 2,
        name: "LaLiga",
        isSelected: false,
    },
]

const Leagues = () => {

    const selectedLeagues = useRef(leagueArray);

    // change the state of ref league, select it if not selected and vice versa
    const selectLeague = (id) => {
        for (let i = 0; i < selectedLeagues.current.length; i++) {
            if (selectedLeagues.current[i].id === id) {
                selectedLeagues.current[i].isSelected = !selectedLeagues.current[i].isSelected;
                return;
            }
        }
    };

    const getSelectedLeagues = () => {
        for (let i = 0; i < selectedLeagues.current.length; i++) {
            if (selectedLeagues.current[i].isSelected) {
                // TODO logic for getting leagues with fixtures from backend

                console.log("Selected Leagues " + selectedLeagues.current[i].name);
            }
        }
    };

    return (
        <div className={` relative_position h-100 ${classes.league_filter}`}>
            <div className="title default_padding_px ps-3 pe-3  pt-2 pb-2 fs-3  ">
                Leagues
            </div>
            <div className="d-none d-md-block">
                <Line />
            </div>
            <div className="mb-1" />
            {selectedLeagues.current.map(l => <LeagueButton key={l.id} league={l} updateLeagues={selectLeague} />)}
            <button className={`ps-3 pe-3 pt-2 pb-2 fs-4 mb-0 text-start position_bottom button  ${classes.filter_button}`} onClick={() => getSelectedLeagues}>FILTER LEAGUES</button>
        </div>
    );
};

export default Leagues;