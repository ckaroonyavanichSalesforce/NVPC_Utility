"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SF = void 0;
const AccountPage_1 = require("../Pages/AccountPage");
const Standard_1 = require("../Pages/Standard");
class SF {
    static async init() {
        this.standard = new Standard_1.Standard();
        this.accountPage = new AccountPage_1.AccountPage();
    }
}
exports.SF = SF;
//# sourceMappingURL=SFAutomation.js.map