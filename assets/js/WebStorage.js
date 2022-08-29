if (localStorage.getItem("username")) {
  document.title += ` - ${localStorage.getItem("username")}`;
}
