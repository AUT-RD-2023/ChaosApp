export function emailBody(gamePin, scenario, responses) {
    const date = new Date().toLocaleString() + "";

    return (
        `Date/Time - ${date}

        Game PIN - ${gamePin}

        Scenario - ${scenario}

        Responses - ${responses}`
    );
}

export function emailSubj(gamePin) {
    return `Chaotic - ${gamePin} Game Results`
}