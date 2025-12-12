const maskEmail = (email) => {
    const [local, domain] = email.split("@");
    const maskedLocal = local.slice(0, 2) + "•".repeat(Math.max(local.length - 2, 0));
    return maskedLocal + "@" + domain;
}

export default maskEmail