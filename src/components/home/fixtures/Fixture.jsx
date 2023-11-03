import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const betGroups = [
    {
        id: 1,
        name: "Match Winner",
        odds: [
            {
                id: 1,
                name: "Home",
                odd: 1.8
            },
            {
                id: 2,
                name: "Draw",
                odd: 2.0
            },
            {
                id: 3,
                name: "Away",
                odd: 2.2
            }
        ]
    },
    {
        id: 2,
        name: "Match Winner",
        odds: [
            {
                id: 1,
                name: "Home",
                odd: 1.8
            },
            {
                id: 2,
                name: "Draw",
                odd: 2.0
            }
        ]
    }
]


const Fixture = ({ fixture, action }) => {

    var fixtureOdds = useRef([]);

    const [selectedOdd, setSelectedGroup] = useState(null);
    const [dontShowOdds, setShowOdds] = useState(true);

    const addOdd = (betGroupId, bgName, oddId, oddName, oddValue) => {
        if (selectedOdd !== null && selectedOdd.betGroup === betGroupId && selectedOdd.odd === oddId) {
            setSelectedGroup(null);

            action({
                type: 'REMOVE_BET', // Specify the action type
                payload: {
                    fixtureIdToRemove: fixture.id,
                },
            });
        } else {
            setSelectedGroup({
                betGroup: betGroupId,
                odd: oddId,
            });
            action({
                type: 'ADD_OR_UPDATE_BET', // Specify the action type
                payload: {
                    fixtureId: fixture.id,
                    home: fixture.home,
                    away: fixture.away,
                    date: fixture.date,
                    betGroupName: bgName,
                    oddId: oddId,
                    oddName: oddName,
                    odd: oddValue,
                },
            });
        }

    };

    const showAllOdds = (fixtureId) => {
        if (fixtureOdds.current.length === 0) {
            console.log('getting odds for fixture ' + { fixtureId });
            fixtureOdds.current = betGroups;
        }
        setShowOdds(!dontShowOdds);
    };


    return (
        <>
            <div className="row light_border w-100 m-auto">
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
                <div className="col-11 col-md-6  p-0 d-flex flex-wrap justify-content-evenly">
                    {fixture.betGroups[0].odds.map(o => {
                        var betGroup = fixture.betGroups[0];
                        return (
                            <button key={o.id} className={`${selectedOdd !== null && selectedOdd.betGroup === betGroup.id && selectedOdd.odd === o.id
                                ? 'odd_button_selected'
                                : 'odd_button'} fs-6`} onClick={() => addOdd(betGroup.id, betGroup.name, o.id, o.name, o.odd)}>
                                {o.name}<br />{o.odd}
                            </button>
                        )
                    })}
                </div>
                <div className="col-1  p-0">
                    <button className=" h-100 w-100 p-0 fs-3 fw-bold border-0 border-md-start m-auto button" onClick={() => showAllOdds(fixture.id)}>
                        +
                    </button>
                </div>
            </div>
            <div className={`${dontShowOdds ? 'invisble' : ''}`}>
                {fixtureOdds.current.length !== 0 ? fixtureOdds.current.map(bg => {
                    return (
                        <div key={bg.id} className="w-100 border-bottom">
                            {console.log('getting odds for fixture ' + bg.name)}
                            <h1 className='p-3 fs-4 '>{bg.name}</h1>
                            <div className=' mb-3 d-flex flex-wrap justify-content-evenly'>
                                {bg.odds.map(o => {
                                    var betGroup = fixture.betGroups[0];
                                    return (
                                        <button key={o.id} className={`${selectedOdd !== null && selectedOdd.betGroup === betGroup.id && selectedOdd.odd === o.id
                                            ? 'odd_button_selected'
                                            : 'odd_button'} fs-7`} onClick={() => addOdd(betGroup.id, betGroup.name, o.id, o.name, o.odd)}>
                                            {o.name}<br />{o.odd}
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
    action: PropTypes.func.isRequired
};

export default Fixture;