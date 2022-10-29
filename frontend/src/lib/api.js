const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND_ADDRESS;
//const BACKEND_ADDRESS = 'http://localhost:8080';
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
        throw new Error('Could not initalize contest data.');
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


    if (!response.ok) {
        throw new Error('Couldnt fetch contests data.');
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
    if (!response.ok) {
        throw new Error('Could not register user');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Could not register user');
    }
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
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Login failed');
    }
}


export async function getTeams(paginationData) {
    const response = await fetch(`${BACKEND_ADDRESS}/teams/${paginationData.page}/${paginationData.size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Couldnt fetch teams data.');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Couldnt fetch teams data.');
    }
}

export async function getTeam(teamData) {
    const response = await fetch(`${BACKEND_ADDRESS}/teams/${teamData.teamId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + teamData.token
        },
    });
    if (!response.ok) {
        throw new Error('Couldnt fetch team data.');
    }
    try {
        const data = await response.json();
        console.log(data)

        return data;
    }
    catch {
        throw new Error('Couldnt fetch team data.');
    }
}



export async function getChallenges(paginationData) {
    const response = await fetch(`${BACKEND_ADDRESS}/challenges/${paginationData.page}/${paginationData.size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Couldnt fetch challenges data.');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Couldnt fetch challenges data.');
    }

}

export async function getChallenge(challengeData) {
    const response = await fetch(`${BACKEND_ADDRESS}/challenges/${challengeData.challengeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + challengeData.token
        },
    });
    if (!response.ok) {
        throw new Error('Couldnt fetch challenge data.');
    }
    try {
        const data = await response.json();
        console.log(data)

        return data;
    }
    catch {
        throw new Error('Couldnt fetch team data.');
    }
}

export async function sendFlag(flagData) {

    const response = await fetch(`${BACKEND_ADDRESS}/challenges/${flagData.challengeId}/flag`, {
        method: 'POST',
        body: JSON.stringify(flagData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Adding flag failed');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Adding flag failed');
    }
}

export async function joinTeam(userData) {

    const response = await fetch(`${BACKEND_ADDRESS}/join-team`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Joining team failed');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Joining team failed');
    }
}



export async function createTeam(userData) {
    const response = await fetch(`${BACKEND_ADDRESS}/create-team`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Creating team failed');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {

        throw new Error('Creating team failed');
    }
}

export async function changeUserCredentials(userData) {
    const response = await fetch(`${BACKEND_ADDRESS}/change-creds`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Updating credentials failed');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {

        throw new Error('Updating credentials failed');
    }
}
