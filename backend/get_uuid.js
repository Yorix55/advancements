async function fetchUuid(username) {
    try {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const uuid = formatUuid(data.id);
        console.log(uuid);
        return uuid;
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}

function formatUuid(uuid) {
    let f_uuid = uuid;
    const positons = [8, 13, 18, 23];
    for (let i = 0; i < positons.length; i++) {
        f_uuid = insertDash(f_uuid, positons[i]);
    }
    return f_uuid;
}

function insertDash(uuid, position) {
    return uuid.slice(0, position) + "-" + uuid.slice(position);
}
export { fetchUuid };