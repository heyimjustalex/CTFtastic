const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND_ADDRESS;
const OPERATOR_ADDRESS = process.env.REACT_APP_OPERATOR_ADDRESS;

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

    return response.json();

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
        throw new Error('No teams found!');
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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + paginationData.token
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
export async function startStopContainers(startStopData) {

    const response = await fetch(`${BACKEND_ADDRESS}/challenges/${String(startStopData.startOrStopValue)}-containers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + startStopData.token
        },
    });
    if (!response.ok) {
        throw new Error('Couldnt start/stop containers');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Couldnt start/stop containers');
    }

}

export async function getContainerState(challengeData) {

    const response = await fetch(`${OPERATOR_ADDRESS}/challstatus?team=${challengeData.teamName}&${challengeData.challName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + challengeData.token
        },
    });

    if (!response.ok) {
        throw new Error('Getting state failed');
    }

    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Getting state failed');
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
        // console.log("CHALL DATA", data);
        return data;
    }
    catch {
        throw new Error('Couldnt fetch team data.');
    }
}

export async function updateChallengeVisiblity(challengeData) {
    // console.log("CHALLENGE DATA", challengeData)
    const response = await fetch(`${BACKEND_ADDRESS}/challenges/${challengeData.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isVisible: challengeData.isVisible }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + challengeData.token
        },
    });
    // console.log(response);
    if (!response.ok) {
        throw new Error('Couldnt update challenge');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Couldnt update challenge');
    }
}

export async function addChallenge(challengeData) {

    const formData = new FormData();
    if (challengeData.dockerfile) {
        formData.append('dockerfile', challengeData.dockerfile);

    }

    formData.append('name', challengeData.name);
    formData.append('description', challengeData.description);
    formData.append('category', challengeData.category);
    formData.append('points', challengeData.points);
    formData.append('flag', challengeData.flag);
    formData.append('isCaseSensitive', challengeData.isCaseSensitive);
    formData.append('isVisible', challengeData.isVisible);

    const response = await fetch(`${BACKEND_ADDRESS}/challenges`, {
        method: 'POST',
        body: formData,

        headers: {
            'Authorization': 'Bearer ' + challengeData.token
        },
    });


    if (!response.ok) {
        throw new Error('Couldnt add new challenge');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Couldnt add new challenge');
    }
}


export async function getUser(requestData) {
    const response = await fetch(`${BACKEND_ADDRESS}/users/${requestData.userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + requestData.token
        },
    });
    if (!response.ok) {
        throw new Error('Couldnt fetch challenge data.');
    }
    try {
        const data = await response.json();

        return data;starting
    }
    catch {
        throw new Error('Couldnt fetch team data.');
    }
}


export async function sendFlag(flagData) {

    const response = await fetch(`${BACKEND_ADDRESS}/challenges/${flagData.challengeId}/flag`, {
        method: 'POST',
        body: JSON.stringify({ flag: flagData.flag }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + flagData.token
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

export async function updateStartStopChallengeContainer(challengeData) {

    const response = await fetch(`${BACKEND_ADDRESS}/challenges/${challengeData.challengeId}/start`, {
        method: 'POST',
        body: JSON.stringify({ isContainerStarted: challengeData.isContainerStarted }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + challengeData.token
        },
    });

    if (!response.ok) {
        throw new Error('Starting/Stopping container failed');
    }

    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Starting/Stopping container failed');
    }
}

export async function buildChallenge(challengeData) {

    const response = await fetch(`${BACKEND_ADDRESS}/challenges/${challengeData.challengeId}/build`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + challengeData.token
        },
    });

    if (!response.ok) {
        throw new Error('Building container failed');
    }

    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Building container failed');
    }
}

export async function getBuildState(challengeData) {

    const response = await fetch(`${OPERATOR_ADDRESS}/challsoperator/buildstatus/${challengeData.challName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Getting image build state failed');
    }

    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Getting image build state failed');
    }
}


export async function startCTF(startData) {

    const response = await fetch(`${BACKEND_ADDRESS}/start-ctf`, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + startData.token
        },
    });
    if (!response.ok) {
        throw new Error('Cannot startCTF');
    }
    try {
        const data = await response.json();
        return data;
    }
    catch {
        throw new Error('Cannot startCTF');
    }
}

export async function joinTeam(userData) {

    const response = await fetch(`${BACKEND_ADDRESS}/teams/join`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData.token
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
    const response = await fetch(`${BACKEND_ADDRESS}/teams`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData.token
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
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData.token
        },
    });
    if (!response.ok) {
        throw new Error('Updating credentials failed');
    }

    return response;

}


export async function deleteUser(userData) {
    const response = await fetch(`${BACKEND_ADDRESS}/teams/${userData.teamId}/user/${userData.userId}`, {
        method: 'DELETE',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData.token
        },
    });

    if (!response.ok) {
        throw new Error('Delete failed ');
    }

    return response;

}


export async function deleteTeam(teamData) {
    const response = await fetch(`${BACKEND_ADDRESS}/teams/${teamData.teamId}`, {
        method: 'DELETE',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + teamData.token
        },
    });
    // console.log(response);
    if (!response.ok) {
        throw new Error('Delete failed ');
    }

    return response;

}