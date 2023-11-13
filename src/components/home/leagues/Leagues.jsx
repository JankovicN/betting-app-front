import LeagueButton from "./LeagueButton";
import classes from "./Leagues.module.css";
import PropTypes from 'prop-types';
import LeagueService from "../../../service/LeagueService";


const Leagues = ({ action, allLeagues, selectedLeagues, onError }) => {


    const addLeagueAndFixtures = (data) => {
        const fixtures = data.data.data;
        action({
            type: 'ADD_FIXTURES',
            payload: {
                fixturesToAdd: fixtures
            }
        })
        setTimeout(() => {
            action({
                type: 'ADD_SELECTED_LEAGUE',
                payload: {
                    selectedLeague: fixtures.id,
                },
            });
        }, 500);
    }

    // change the state of selected leagues, select it if not selected and vice versa
    const selectLeague = (leagueId) => {
        const currentlySelectedLeagues = selectedLeagues;
        if (currentlySelectedLeagues.includes(leagueId)) {
            console.log("Removing fixtures for league id")
            console.log(leagueId)
            action({
                type: 'REMOVE_FIXTURES',
                payload: { leagueId }
            })
            console.log("Removing league for league id")
            console.log(leagueId)
            setTimeout(() => {
                action({
                    type: 'REMOVE_SELECTED_LEAGUE',
                    payload: { leagueToRemove: leagueId }
                })
            }, 500);
        } else {
            LeagueService.getFixturesForLeague(leagueId, addLeagueAndFixtures, onError);
        }
    };


    return (
        <div className={` title relative_position rounded_border h-100 ${classes.league_filter}`}>
            <div className=" default_padding_px ps-3 pe-3  pt-2 pb-2 fs-3">
                Leagues
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