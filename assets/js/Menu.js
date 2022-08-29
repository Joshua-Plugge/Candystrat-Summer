function onLoad()
{
    const username = localStorage.getItem("username");
    const score = localStorage.getItem("score") !== undefined
        ? Number(localStorage.getItem("score"))
        : undefined;
    
    if (username !== undefined && username !== null)
    {
        if (score !== undefined && score >= 100)
        {
            alert(`Welcome back ${username}!\nYou have beaten this game with a score of ${score}.\n Good luck trying again.`);
        }
        else if (score !== undefined && score !== 0)
        {
            alert(`Welcome back ${username}!\nYour previous score was ${score}.\n Good luck this time.`);
        }
        else
        {
            alert(`Welcome ${username} to Candystrat!`);
        }
    }
    else
    {
        alert("You have not inserted your username!\nRedirecting back to home page.");
        const url = window.location.pathname;
        window.location.href = url.replace("menu.html", "index.html");
    }

}
