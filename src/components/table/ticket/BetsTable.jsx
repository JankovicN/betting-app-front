import PropTypes from 'prop-types';

const BetsTable = ({ bets }) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Fixture</th>
                    <th className='text_center'>Result</th>
                    <th className='text_center'>Fixture Date</th>
                    <th className='text_center'>Odd</th>
                    <th className='text_center'>State</th>
                </tr>
            </thead>
            <tbody>
                {bets.map((bet) => (
                    <tr key={bet.id}>
                        <td>
                            {`${bet.home} - ${bet.away}`}
                            <div className="text-muted">{bet.betGroupName}</div>
                        </td >
                        <td className='text_center'>{bet.result}</td>
                        <td className='text_center'>
                            {new Date(bet.fixtureDate).toLocaleDateString()}
                            <br />
                            {new Date(bet.fixtureDate).toLocaleTimeString()}
                        </td>
                        <td className='text_center'>{bet.odd} <br /> {bet.name}</td>
                        <td className='text_center'>{bet.state}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


BetsTable.propTypes = {
    bets: PropTypes.object.isRequired,
};

export default BetsTable;
