import LeagueButton from "./LeagueButton";
import classes from "./Leagues.module.css";
import PropTypes from 'prop-types';
import Line from "../../common/Line";
import LeagueService from "../../../service/LeagueService";


const Leagues = ({ action, allLeagues, selectedLeagues, onError }) => {


    const addLeagueAndFixtures = (data) => {
        action({
            type: 'ADD_FIXTURES',
            payload: {
                fixturesToAdd: data
            }
        })
        action({
            type: 'ADD_SELECTED_LEAGUE',
            payload: {
                selectedLeague: data.id
            }
        })
    }

    // change the state of selected leagues, select it if not selected and vice versa
    const selectLeague = (leagueId) => {
        if (selectedLeagues.includes(leagueId)) {
            action({
                type: 'REMOVE_FIXTURES',
                payload: { leagueId }
            })
            action({
                type: 'REMOVE_SELECTED_LEAGUE',
                payload: { leagueId }
            })
        } else {
            LeagueService.getFixturesForLeague(leagueId, addLeagueAndFixtures, onError);
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

            {allLeagues.length === 0 ? (
                // Loading state
                <div className="centered_container">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {allLeagues.map(l => <LeagueButton key={l.id} league={l} updateLeagues={selectLeague} selectedLeagues={selectedLeagues} />)}
                </>
            )}

        </div>
    );
};

Leagues.propTypes = {
    action: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    allLeagues: PropTypes.array.isRequired,
    selectedLeagues: PropTypes.array.isRequired
};

export default Leagues;