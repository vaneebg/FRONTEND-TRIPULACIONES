
describe("Test para testear registro", () => {
  it("Abrimos la web", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Correo");
    cy.contains("Contraseña");
    cy.contains("Regístrate");
  });
  it("Check estado vacío", () => {
    cy.window()
      .its("store")
      .invoke("getState")
      .its("auth")
      .should("deep.equal", {
        user: null,
        userUpdated: {},
        info: {},
        isError: false,
        isSuccess: false,
        messageDelete: "",
        message: "",
        messageLogout: "",
      });
});
it('Accedemos al registro', () =>{
  cy.contains("Regístrate").click()
})
  it('Verificación de url', ()=>{
    cy.url().should('include', '/register' )
  })

    it('Rellenamos todos los campos', ()=>{
      cy.get('input[name="name"]').click().type('Dumbo2')
      cy.get('input[name="email"]').click().type('Dumbo2@gmail.com')
      cy.get('#root > .App > .register-container > .form-register-container > select')
      cy.get('#root > .App > .register-container > .form-register-container > select').select('men')
      cy.get('#root > .App > .register-container > .form-register-container > select')
      cy.get('input[name="password"]').click().type('123456')
      cy.get('input[name="password2"]').click().type('123456')
      cy.get("input[type=file]").attachFile('radec.jpg')
      cy.get('[type="submit"]').click()
      cy.get('div > .ant-notification-notice > .ant-notification-notice-content > .ant-notification-notice-with-icon > .ant-notification-notice-description').should('have.text', 'Te hemos enviado un email para confirmar tu registro...')
      
    })
});
