export function emailBody(gamePin, scenario, responses) {
    const date = new Date().toLocaleString() + "";

    return (
        `Date/Time - ${date}` +
        `%0D%0A%0D%0A`+
        `Game PIN - ${gamePin}`+
        `%0D%0A%0D%0A`+
        `Scenario - ${scenario}`+
        `%0D%0A%0D%0A`+
        `Responses - ${responses}`
    );
}

export function emailSubj(gamePin) {
    return `Chaotic - ${gamePin} Game Results`
}