import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import BetGroupService from '../../../service/BetGroupService';
import classes from './Fixture.module.css'


const Fixture = ({ fixture, action, ticket, onError }) => {

    const fixtureOdds = useRef([]);
    const [dontShowOdds, setShowOdds] = useState(true);

    const addOdd = (betGroup, odd) => {
        if (checkIfSelected(betGroup.id, odd.id)) {
            action({
                type: 'REMOVE_BET', // Specify the action type
                payload: {
                    fixtureIdToRemove: fixture.id,
                },
            });
        } else {
            action({
                type: 'ADD_OR_UPDATE_BET', // Specify the action type
                payload: {
                    fixtureId: fixture.id,
                    home: fixture.home,
                    away: fixture.away,
                    date: fixture.date,
                    betGroupName: betGroup.name,
                    betGroupId: betGroup.id,
                    oddId: odd.id,
                    oddName: odd.name,
                    odd: odd.odd,
                },
            });
        }
    };

    const onSuccess = (data) => {
        fixtureOdds.current = data
        setShowOdds(false)
    }

    const showAllOdds = (fixtureId) => {
        if (fixtureOdds.current !== undefined && fixtureOdds.current.length === 0) {
            console.log(`Getting ALL odds for Fixutre ${fixtureId}`);
            BetGroupService.getAllOddsForFixture(fixtureId, onSuccess, onError);
        } else {
            const showingOdds = dontShowOdds;
            setShowOdds(!showingOdds)
        }
    }

    const checkIfSelected = (betGroupId, oddId) => {
        return ticket.bets.some((bet) => bet.fixtureId === fixture.id &&
            bet.betGroupId === betGroupId &&
            bet.oddId === oddId)
    }

    return (
        <>
            <div className={`row  ${dontShowOdds ? 'rounded_bottom_border' : 'light_border'}  w-100 m-auto `}>
                <div className="col-11 col-md-3 mt-3 mb-md-3">
                    <div className="  m-auto fs-6  d-block d-md-none">
                        {fixture.home.name} - {fixture.away.name}
                    </div>
                    <div className="  m-auto fs-6  d-none d-md-block">
                        {fixture.home.name}
                    </div>
                    <div className="  p-auto fs-6  d-none d-md-block">
                        {fixture.away.name}
                    </div>
                </div>
                <div className="col-2 fs-6 border-end border-start m-auto d-none d-md-block">
                    {fixture.date.split(' ')[0]}<br />
                    {fixture.date.split(' ')[1]}
                </div>
                <div className="col-11 fs-6 d-block d-md-none">
                    {fixture.date.split(' ')[0] + " " + fixture.date.split(' ')[1]}
                </div>
                <div className="col-11 col-md-6  p-0 d-flex flex-wrap justify-content-evenly ">
                    {fixture.betGroupList[0].odds.map(odd => {
                        const betGroup = fixture.betGroupList[0];
                        return (
                            <button
                                className={`${checkIfSelected(betGroup.id, odd.id) ? 'odd_button_selected' : 'odd_button'} fs-6 border rounded border-secondary`}
                                onClick={() => addOdd(betGroup, odd)}
                                key={odd.id}>
                                {odd.name}<br />{odd.odd}
                            </button>
                        )
                    })}
                </div>
                <div className="col-1  p-0">
                    <button
                        className={`h-100 w-100 p-0 fs-3 fw-bold border-0 border-md-start m-auto button ${dontShowOdds ? classes.show_odds_button_border : ''}`}
                        onClick={() => showAllOdds(fixture.id)}>
                        +
                    </button>
                </div>
            </div>
            <div className={`${dontShowOdds ? 'invisble' : ''} border  border-secondary`}>
                {fixtureOdds.current.length !== 0 && !dontShowOdds ? fixtureOdds.current.map(bg => {
                    return (
                        <div key={bg.id} className="w-100 border-bottom ">
                            <h1 className={`p-3 fs-4 ${classes.bet_group_title}`}>{bg.name}</h1>

                            <div className=' mb-3 d-flex flex-wrap justify-content-evenly'>
                                {bg.odds.map(odd => {
                                    const betGroup = bg;
                                    return (
                                        <button
                                            key={odd.id}
                                            className={`${checkIfSelected(betGroup.id, odd.id) ? 'odd_button_selected' : 'odd_button'} fs-7 mb-1 border rounded border-secondary`}
                                            onClick={() => addOdd(betGroup, odd)}>
                                            {odd.name}<br /><span className='fw-bold'>{odd.odd}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }) : <></>}
            </div>
        </>
    );
};

Fixture.propTypes = {
    fixture: PropTypes.object.isRequired,
    ticket: PropTypes.object.isRequired,
    action: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default Fixture;