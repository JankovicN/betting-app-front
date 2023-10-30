
import PropTypes from 'prop-types';

const TicketBet = ({ bet }) => {


    return (
        <div className='light_border p-3'>
            <div className='fw-bold fs-6'>
                {bet.home.name + ' - ' + bet.away.name}
            </div>
            <div>
                {bet.date}
            </div>
            <div className="row">
                <div className='col-6 text-start fs-6'>
                    {bet.betGroupName}
                </div>
                <div className='col-6 text-end fs-6 fw-bold'>
                    {bet.oddName + ' ' + bet.odd}
                </div>
            </div>
        </div>
    );
};

TicketBet.propTypes = {
    bet: PropTypes.object.isRequired,
};

export default TicketBet;