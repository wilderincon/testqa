const { expect, test }  = require("@playwright/test");

/**
 * 
 * here we're create the model about login page, 
 * **/
exports.LoginPage = class LoginPage {
    
  /**
   * @param {import('@playwright/test').Page} page
   */
    
  //extract the components of the login page
  constructor(page) {
    this.page = page;
    this.documentTypeField = page.locator(`//select[@name='typeDocument']`)
    this.documentNumberField = page.locator(`//input[@placeholder='Ingresa el documento']`)
    this.passwordField = page.locator(`//input[@placeholder='Ingresa la contraseña']`)
    this.loginButton = page.locator(`//button[@name='form_login_user']`)
    this.message = page.locator(`(//h2[normalize-space()='¡Hola, WILDER YAMID!'])[1]`)
  }
  //path to  the page that will be opened by default when you start  your browser with playwright
  async openUrl(url) {
    await this.page.goto(url);
  }
  //this function  is used to select document type field on the login page
  async selectDocumentType(documentTypeField){
    await  this.documentTypeField.click();
    await  this.documentTypeField.selectOption({label: documentTypeField});
  }
  //this function is used fill  up document number field of the login page
  async typeDocumentNumber(number){
    await  this.documentNumberField.click();
    await  this.documentNumberField.fill(number);
  }
  //this function is used for select and type password on login page
  async typePassword(password){
    await  this.passwordField.click();
    await  this.passwordField.fill(password);
  }
  //this function is used for genereted event click  in button sign in from login page
  async selectLoginButton(){
    await  this.loginButton.click();
  }
  //this function is used for validate message
  async validateMessage(message){
    expect(await  this.message).toBeVisible(message)
  }


}