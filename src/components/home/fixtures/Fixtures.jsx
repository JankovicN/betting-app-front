
import Fixture from "./Fixture";
import PropTypes from 'prop-types';
import classes from './Fixture.module.css';

const Fixtures = ({ fixtureData, action, onError }) => {
    return (
        <div className={`${classes.fixtures_div} relative_position h-100 `}>
            <div className="title default_padding_px ps-3 pe-3  pt-2 pb-2 fs-3  d-none d-md-block rounded_border">
                All Fixtures
            </div>
            {fixtureData.fixtures.length !== 0 ? fixtureData.fixtures.map(l => {
                return (
                    <div key={l.id} className="pb-2 mt-1">
                        <div className={`title default_padding_px rounded_top_border ps-3 pe-3 pb-2 fs-4 ${classes.league_name_div}`}>
                            {l.name}
                        </div>
                        {l.fixtures.map(f => {
                            return (
                                <Fixture key={f.id} fixture={f} action={action} ticket={fixtureData.ticket} onError={onError} />
                            )
                        })}
                    </div>
                )
            }) : <></>}
        </div>
    );
};

Fixtures.propTypes = {
    action: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    fixtureData: PropTypes.object.isRequired
};

export default Fixtures;