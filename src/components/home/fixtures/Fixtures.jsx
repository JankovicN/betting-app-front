import Line from "../../common/Line";
import Fixture from "./Fixture";
import PropTypes from 'prop-types';

const Fixtures = ({ fixtureData, action, onError }) => {
    return (
        <div className={` relative_position h-100`}>
            <div className="title default_padding_px ps-3 pe-3  pt-2 pb-2 fs-3  d-none d-md-block">
                All Fixtures
            </div>
            <div className="d-none d-md-block">
                <Line />
            </div>
            {fixtureData.fixtures.length !== 0 ? fixtureData.fixtures.map(l => {
                return (
                    <div key={l.id} className="pb-2">
                        <div className="title default_padding_px ps-3 pe-3 pb-2 fs-4">
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