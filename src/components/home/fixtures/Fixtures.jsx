import Line from "../../common/Line";
import Fixture from "./Fixture";
import PropTypes from 'prop-types';


const fixturesArray = [
    {
        id: 1,
        name: "Premier League",
        fixtures: [
            {
                id: 1,
                home: {
                    id: 1,
                    name: "Manchester United"
                },
                away: {
                    id: 2,
                    name: "Manchester City"
                },
                date: "23.10.2023 19:00",
                betGroups: [
                    {
                        id: 1,
                        name: "Match Winner",
                        odds: [
                            {
                                id: 1,
                                name: "Home",
                                odd: 1.95
                            },
                            {
                                id: 2,
                                name: "Draw",
                                odd: 2.0
                            },
                            {
                                id: 3,
                                name: "Away",
                                odd: 2.56
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                home: {
                    id: 3,
                    name: "Liverpool"
                },
                away: {
                    id: 4,
                    name: "Brighton"
                },
                date: "23.10.2023 20:00",
                betGroups: [
                    {
                        id: 1,
                        name: "Match Winner",
                        odds: [
                            {
                                id: 1,
                                name: "Home",
                                odd: 1.4
                            },
                            {
                                id: 2,
                                name: "Draw",
                                odd: 2.05
                            },
                            {
                                id: 3,
                                name: "Away",
                                odd: 2.75
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        id: 2,
        name: "LaLiga",
        fixtures: [
            {
                id: 3,
                home: {
                    id: 1,
                    name: "Barcelona"
                },
                away: {
                    id: 2,
                    name: "Sevilla"
                },
                date: "22.10.2023 19:00",
                betGroups: [
                    {
                        id: 1,
                        name: "Match Winner",
                        odds: [
                            {
                                id: 1,
                                name: "Home",
                                odd: 1.6
                            },
                            {
                                id: 2,
                                name: "Draw",
                                odd: 2.1
                            },
                            {
                                id: 3,
                                name: "Away",
                                odd: 2.3
                            }
                        ]
                    }
                ]
            },
            {
                id: 4,
                home: {
                    id: 3,
                    name: "Getafe"
                },
                away: {
                    id: 4,
                    name: "Girona"
                },
                date: "25.10.2023 20:00",
                betGroups: [
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
                    }
                ]
            },
        ]
    },
]

const Fixtures = ({fixtureData, action}) => {
    return (
        <div className={` relative_position h-100`}>
            <div className="title default_padding_px ps-3 pe-3  pt-2 pb-2 fs-3  d-none d-md-block">
                All Fixtures
            </div>
            <div className="d-none d-md-block">
                <Line />
            </div>
            {fixtureData.map(l => {
                return (
                    <div key={l.id} className="pb-2">
                        <div className="title default_padding_px ps-3 pe-3 pb-2 fs-4">
                            {l.name}
                        </div>
                        {l.fixtures.map(f => {
                            return (
                                <Fixture key={f.id} fixture={f} action={action}/>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
};

Fixtures.propTypes = {
    action: PropTypes.func.isRequired,
    fixtureData: PropTypes.array.isRequired
};

export default Fixtures;