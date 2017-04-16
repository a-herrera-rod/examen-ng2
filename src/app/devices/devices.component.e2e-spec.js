describe('devices', function () {

    beforeEach(function () {
        browser.get('/devices');
    });

    it('should show loging when I go to devices url', function () {
        var login = element(by.tagName('my-login'));
        expect(login.isPresent()).toEqual(true);
    });
    it('should redirect to devices component when I logged', function () {
        login();
        element(by.id('btnLogin')).click().then(function () {
            expect(eventual(protractor.ExpectedConditions.presenceOf(element(by.tagName('devices'))))).toBe(true);
        });
        browser.waitForAngular();
    });
});
function getCards() {
    return element.all(by.className('card-outline-secondary'));
}
function getSelectOptions(element) {
    return element.all(by.tagName('option'));
}
function login() {
    var login = element(by.tagName('my-login'));
    expect(login.isPresent()).toEqual(true);

    var email = login.element(by.id("inputEmail"));
    email.sendKeys('jcyovera@gmail.com');
    var passwd = login.element(by.id("inputPassword"));
    passwd.sendKeys('admin123');
}

function eventual(expectedCondition) {
    return browser.wait(expectedCondition).then(function () {
        return true;
    }, function () {
        return false;
    });
}