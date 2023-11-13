import api from '../util/api';

const depositAmount = (userId, amount, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Depositing amount ( ${amount} ) to user with id ${userId}`)
    api.post(`/payment/deposit`, { userId, amount })
        .then((response) => {
            console.log(response)
            onSuccess(response.data.infoMessages);
        })
        .catch((error) => {
            onError(error)
        });
};

const withdrawAmount = (userId, amount, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Withdrawing amount ( ${amount} ) from user with id ${userId}`)
    api.post(`/payment/withdraw`, { userId, amount })
        .then((response) => {
            console.log(response)
            onSuccess(response.data.infoMessages);
        })
        .catch((error) => {
            onError(error)
        });
};

const getUserBalance = (userID, onSuccess, onError) => {
    console.log("=====================================================")
    console.log(`Fetching balance for user with id  ${userID}`)
    api.get(`/payment/balance`, { params: { userID } })
        .then((response) => {
            console.log(response)
            onSuccess(response.data.data);
        })
        .catch((error) => {
            onError(error)
        });
};

export default {
    depositAmount,
    withdrawAmount,
    getUserBalance
};
