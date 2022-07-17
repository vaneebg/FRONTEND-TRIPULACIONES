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
        isError: false,
        isSuccess: false,
        messageDelete: "",
        message: "",
        messageLogout: "",
      });
  });
  it("Accedemos al registro", () => {
    cy.contains("Regístrate").click();
  });
  it("Verificación de url", () => {
    cy.url().should("include", "/register");
  });
  it("Comprobación de registro", () => {
    cy.get('input[name="name"]').click().type("Radec");
    cy.wait(1000);
    cy.get('input[name="email"]').click().type("radec@gmail.com");
    cy.wait(1000);
    cy.get(
      "#root > .App > .register-container > .form-register-container > select"
    );
    cy.get(
      "#root > .App > .register-container > .form-register-container > select"
    ).select("men");
    cy.get(
      "#root > .App > .register-container > .form-register-container > select"
    );
    cy.get('input[name="password"]').click().type("123456");
    cy.get('input[name="password2"]').click().type("123456");
    cy.get("input[type=file]").attachFile("radec.jpg");
    cy.wait(3000);
    cy.get('[type="submit"]').click();
    cy.get(
      "div > .ant-notification-notice > .ant-notification-notice-content > .ant-notification-notice-with-icon > .ant-notification-notice-description"
    ).should(
      "have.text",
      "Te hemos enviado un email para confirmar tu registro..."
    );
  });
});

beforeEach(() => {
  cy.restoreLocalStorage("user")
})

afterEach(() => {
  cy.saveLocalStorage("user")
})

describe("Test para testear confirmación y Login", () => {
  it("Comprobación de logueo", () => {
    cy.request("get", "http://localhost:8080/users/confirmByCypress");
    cy.wait(3000);
    cy.visit("http://localhost:3000");
    cy.get('input[name="email"]').click().type("radec@gmail.com");
    cy.wait(3000);
    cy.get('input[name="password"]').click().type("123456");
    cy.wait(3000);
    cy.get('[type="submit"]').click();
    cy.get(
      "div > .ant-notification-notice > .ant-notification-notice-content > .ant-notification-notice-with-icon > .ant-notification-notice-description"
    ).should("have.text", "Bienvenid@ Radec");
    cy.url().should("include", "/main");
  });
});

describe("Test para comprobar estados y actualización de usuario", () => {
  it("Actualización de perfil y borrado del usuario", () => {
    cy.get('[data-icon = "user"]').click({ force: true })
    cy.get("body > #root > .App > .ant-btn > span").click()
    cy.wait(3000);
    cy.get('[name="name"]').should("have.value", "Radec")
    cy.wait(3000);
    cy.get('[name="name"]').click().clear().type("Caro")
    cy.wait(3000);
    cy.get('[name="genre"]').select("women")
    cy.wait(3000);
    cy.get('[name="password"]').type("654321")
    cy.get("input[type=file]").attachFile("Luke.jpg");
    cy.wait(3000);
    cy.get("[type='submit']").click()
    cy.get("[class='Button']").click()
    cy.wait(3000);
    cy.get("[class='ant-btn ant-btn-primary ant-btn-sm']").click()
  });
});
