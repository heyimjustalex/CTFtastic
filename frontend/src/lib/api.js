const BACKEND_ADDRESS = 'http://localhost:8080';
//const BACKEND_ADDRESS = 'https://react-http-f2a23-default-rtdb.europe-west1.firebasedatabase.app';

export async function setUpContest(setupData) {
    const response = await fetch(`${BACKEND_ADDRESS}/set-up`, {
        method: 'POST',
        body: JSON.stringify(setupData),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(setupData.error || 'Could not initalize contest data.');
    }

    var contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    } else {
        return null;
    }
}
export async function getContests() {
    const response = await fetch(`${BACKEND_ADDRESS}/contests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response;

    if (!response.ok) {
        throw new Error(data.error || 'Couldnt fetch teams data.');
    }

    var contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    } else {
        return null;
    }

}


export async function registerUser(userData) {
    const response = await fetch(`${BACKEND_ADDRESS}/register`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Could not register user');
    }
    return null;
}

export async function loginUser(userData) {

    const response = await fetch(`${BACKEND_ADDRESS}/login`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error('Could not login user');
    }
    return data;
}


export async function getTeams(paginationData) {
    const response = await fetch(`${BACKEND_ADDRESS}/teams/${paginationData.page}/${paginationData.size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Couldnt fetch teams data.');
    }
    return data;
}


export async function getChallenges(paginationData) {
    const response = await fetch(`${BACKEND_ADDRESS}/challenges/${paginationData.page}/${paginationData.size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Couldnt fetch teams data.');
    }
    return data;
}