class Sidebar {
  getLogOutButton() {
    return cy.get("[data-test=sidenav-signout]");
  }
}
export default Sidebar;
