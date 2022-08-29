/** @type {HTMLFormElement} */
function onLoad()
{
    let usernameInput = document.forms["username-form"]["username"];
    if (localStorage.getItem("username") !== undefined)
    {
        usernameInput.value = localStorage.getItem("username");
    }
}
let form = document.getElementById("username-form");
form.addEventListener("submit", event =>
{
    /** @type {HTMLInputElement} */
    const usernameInput = form["username"];
    localStorage.setItem("username", usernameInput.value);
    location.href = "menu.html";
    event.preventDefault();
});
