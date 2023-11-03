import LeagueButton from "./LeagueButton";
import classes from "./Leagues.module.css";
import PropTypes from 'prop-types';
import Line from "../../common/Line";
import FixtureService from "../../../service/FixtureService";
import { useEffect } from "react";
import LeagueService from "../../../service/LeagueService";


const Leagues = ({ action, allLeagues, selectedLeagues, showError }) => {

    const onSuccess = (data) => {
        action({
            type: 'SET_LEAGUES',
            payload: data
        })
        if (selectedLeagues.lenght === 0) {
            action({
                type: 'ADD_LEAGUE',
                payload: data[0].id
            })
        }
    }
    const onError = (data) => {
        console.log(data)
        showError(data)
    }

    useEffect(() => {
        LeagueService.getAllLeagues(onSuccess, onError);
    }, []);

    const addLeagueAndFixtures = (data) => {
        action({
            type: 'ADD_LEAGUE',
            payload: {
                data
            }
        })
    }

    // change the state of selected leagues, select it if not selected and vice versa
    const selectLeague = (id) => {
        if (selectedLeagues.includes(id)) {
            action({
                type: 'REMOVE_LEAGUE',
                payload: id
            })
        } else {
            FixtureService.getFixturesForLeague(id, addLeagueAndFixtures);
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
                <div style="centered_container">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {allLeagues.map(l => <LeagueButton key={l.id} league={l} updateLeagues={selectLeague} />)}
                </>
            )}

        </div>
    );
};

Leagues.propTypes = {
    action: PropTypes.func.isRequired,
    allLeagues: PropTypes.array.isRequired,
    selectedLeagues: PropTypes.array.isRequired,
    showError: PropTypes.func.isRequired
};

export default Leagues;