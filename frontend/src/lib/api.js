//const BACKEND_ADDRESS = 'http://localhost:8080';
const BACKEND_ADDRESS = 'https://react-http-f2a23-default-rtdb.europe-west1.firebasedatabase.app';

export async function addStartingData(startingData) {
    const response = await fetch(`${BACKEND_ADDRESS}/startingData.json`, {
        method: 'POST',
        body: JSON.stringify(startingData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not initalize contest data.');
    }
    return null;
}

export async function getTeams() {
    const response = await fetch(`${BACKEND_ADDRESS}/teams.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Couldnt fetch teams data.');
    }
    console.log('KEY')
    let arr = [];

    for (let key in data) {
        const obj = data[key];
        arr.push(obj)
    }

    // console.log("sadasf")
    console.log(arr)

    return arr;
}
