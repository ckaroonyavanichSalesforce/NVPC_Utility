import { AccountPage } from '../Pages/AccountPage'
import { Standard } from '../Pages/Standard'

export class SF {

    public static standard: Standard;
    public static accountPage: AccountPage;



    public static async init() {
        this.standard = new Standard();
        this.accountPage = new AccountPage();
    }

}