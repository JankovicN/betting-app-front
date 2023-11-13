import PropTypes from 'prop-types';
import './Ticket.css';



const BetsTable = ({ bets }) => {
    return (
        <table className="table table-hover unselectable-text  ">
            <thead>
                <tr className=''>
                    <th className='column_name'>Fixture</th>
                    <th className='text_center column_name'>Bet</th>
                    <th className='text_center column_name'>Result</th>
                    <th className='text_center column_name'>Date</th>
                    <th className='text_center column_name'>Odd</th>
                    <th className='text_center column_name'>State</th>
                </tr>
            </thead>
            <tbody>
                {bets.map((bet) => (
                    <tr key={bet.id}
                    >
                        <td>
                            <div className="border-bottom pb-1">
                                {bet.home}
                            </div>
                            <div className="pt-1">
                                {bet.away}
                            </div>
                        </td >
                        <td>
                            <div className='text_center align-middle '>{bet.betGroupName} <br /><span className='column_name'>{bet.name}</span></div></td>
                        <td className='text_center align-middle'>{bet.result}</td>
                        <td className='text_center align-middle'>
                            {new Date(bet.fixtureDate).toLocaleDateString()}
                            <br />
                            {new Date(bet.fixtureDate).toLocaleTimeString()}
                        </td>
                        <td className='text_center align-middle column_name'>{bet.odd}</td>
                        <td className={`text_center align-middle fw-bold fs-4 state-${bet.state}`}>{bet.state}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


BetsTable.propTypes = {
    bets: PropTypes.array.isRequired,
};

export default BetsTable;
