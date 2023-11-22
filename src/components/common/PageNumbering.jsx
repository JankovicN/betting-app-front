
import PropTypes from 'prop-types';

const PageNumbering = ({ maxValue, currentPage, handlePageClick }) => {
    // Create an array of integers from 0 to maxValue
    const numbers = Array.from({ length: maxValue }, (_, index) => index);


    return (
        <div>
            {numbers.map((number) => (
                <span
                    key={number}
                    className={currentPage === number ? 'active' : ''}
                    onClick={() => handlePageClick(number)}
                >
                    {number+1}
                </span>
            ))}
        </div>
    );
};


PageNumbering.propTypes = {
    maxValue: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired,
};

export default PageNumbering;
