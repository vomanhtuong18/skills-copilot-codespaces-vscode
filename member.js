function skillsMember() {
    let skills = ['html', 'css', 'js', 'php', 'mysql', 'c++', 'python', 'java'];
    let skill = skills[Math.floor(Math.random() * skills.length)];
    return skill;
}