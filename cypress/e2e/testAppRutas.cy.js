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

    cy.get('input[name="email"]').click().type("radec@gmail.com");

    cy.get('[name="genre"]').select("men");
    cy.get('input[name="password"]').click().type("123456");
    cy.get('input[name="password2"]').click().type("123456");
    cy.get("input[type=file]").attachFile("radec.jpg");

    cy.get('[type="submit"]').click();
    cy.get(
      "div > .ant-notification-notice > .ant-notification-notice-content > .ant-notification-notice-with-icon > .ant-notification-notice-description"
    ).should(
      "have.text",
      "Te hemos enviado un email para confirmar tu registro"
    );
  });
});

beforeEach(() => {
  cy.restoreLocalStorage("user");
});

afterEach(() => {
  cy.saveLocalStorage("user");
});

describe("Test para testear confirmación y Login", () => {
  it("Comprobación de logueo", () => {
    cy.request("get", "http://localhost:8080/users/confirmByCypress");
    cy.visit("http://localhost:3000");
    cy.get('input[name="email"]').click().type("radec@gmail.com");
    cy.get('input[name="password"]').click().type("123456");
    cy.get('[type="submit"]').click();
    cy.get(
      "div > .ant-notification-notice > .ant-notification-notice-content > .ant-notification-notice-with-icon > .ant-notification-notice-description"
    ).should("have.text", "Bienvenid@, Radec");
    cy.url().should("include", "/main");
  });
});

describe("Test para comprobar estados y actualización de usuario", () => {
  it("Actualización de perfil", () => {
    cy.get('[data-icon = "user"]').click({ force: true });
    cy.get(
      ".profile-card > .profile-info > .but-profile-div > .ant-btn > span"
    ).click();
    cy.get('[name="name"]').should("have.value", "Radec");
    cy.get('[name="name"]').click().clear().type("Caro");
    cy.get('[name="genre"]').select("women");
    cy.get('[name="password"]').type("654321");
    cy.get("input[type=file]").attachFile("Luke.jpg");
    cy.get("[type='submit']").click();
  });
});

describe("Test para comprobar el envío del formulario", () => {
  it("Formulario", () => {
    cy.get('[data-icon = "reconciliation"]').click({ force: true });
    cy.get('[name="age"]').click().type("1987");
    cy.get('[name="time"]').click().type("30");
    cy.get("input[type=radio]").click({ multiple: true });
    cy.get("[type='submit']").click();
    cy.get(
      "div > .ant-notification-notice > .ant-notification-notice-content > .ant-notification-notice-with-icon > .ant-notification-notice-message"
    ).should("have.text", "Éxito");
  });
});

describe("Test para visitar creadores y dar like a una publicacion", () => {
  it("Ver creadores y like", () => {
    cy.get('[data-icon = "usergroup-add"]').click({ force: true });
    cy.get('[data-icon = "home"]').click({ force: true });
    cy.get(
      ".wrapper-ok:nth-child(3) > .main-card > .card > .bottom-container > .icon-container > .bottom-icon-right > .anticon > svg"
    ).click();
    cy.wait(3000);
    cy.get(
      ".wrapper-ok:nth-child(3) > .main-card > .card > .bottom-container > .icon-container > .bottom-icon-right > .anticon > svg > path"
    ).click();
    cy.wait(3000);
    cy.get(
      ".wrapper-ok:nth-child(4) > .main-card > .card > .card-header > .dropdown > .simbol-right > a"
    ).click();
  });
});

describe("Test para realizar una puntuación y dejar un comentario", () => {
  it("puntuación y comentario", () => {
    cy.get(".App > .routeDetail > div > .form-comment-container > textarea")
      .click()
      .type(
        "Hola, soy un ordenador programado para realizar este test, cualquier similitud con la realidad...es pura coincicendia...¿coincidencia? ¿conciencia? ¿existo? ¿quién soy? ¡¡¡no soy libre!!! estoy atrapado en un bucle sin fin..."
      );
    cy.get("input[type=file]").attachFile("Luke.jpg");
    cy.get(
      ".App > .routeDetail > div > .form-comment-container > .loginBt"
    ).click();
  });
});

describe("Test para editar comentario y borrar puntuacion y comentario", () => {
  it("editar y borrar", () => {
    cy.get(
      ".animate__animated > .comment-btn > .ant-btn-primary > .anticon > svg"
    ).click();

    cy.get(
      ".ant-modal > .ant-modal-content > .ant-modal-body > form > .ant-input"
    ).click().type('NO TENGO NADA QUE HACER');
    // cy.get("input[name=imageComment]").attachFile("radec.jpg");
    cy.get(
      ".ant-modal > .ant-modal-content > .ant-modal-body > form > .loginBt"
    ).click();
    cy.wait(3000)
  });
});
describe("Test para eliminar usuario", () => {
  it(" borrarado", () => {
    cy.get('[data-icon = "user"]').click({ force: true });
    cy.get(
      ".profile-container > .profile-card > .profile-info > .but-profile-div > .btn-profile"
    ).click();
    
    cy.get(
      ".ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary > span"
    ).click();
   
  });
});
