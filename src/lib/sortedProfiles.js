const sortedProfiles = (data, userId) => {
    const myProfile = []
    const following = []
    const notFollowing = []
    data.forEach(e => {
        if (e.id === userId) {
            myProfile.push(e)
        } else if (e.is_following) {
            following.push(e)
        } else {
            notFollowing.push(e)
        }
    })
    return [...myProfile, ...following, ...notFollowing]
}

export default sortedProfiles