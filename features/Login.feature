Feature: General Testing

    Scenario: SF Login As PACMY_B2B_Specin_Sales
        Given I navigate to "https://login.salesforce.com"
        #When I click Log In with a Different Username
        When I login to SF as "user1"
       # And I change login user to "PACMY_B2B_Specin_Sales"
 
    Scenario: Create new account
        Given I am in "Accounts" object
        When I click "New" button on list view page
        And Fill Normal Fields in a "New Account: Person Account" record details form
        |Account Name  |
        |Automation     |
        And Fill Picklist Fields in a "New Account: Person Account" record details form
        |Type       |Industry        |Ownership|
        |Prospect   |Banking         |Public   |
   #     And Fill MultiValue Fields in a "New Account: Person Account" record details form
   #     |Regional category   |
   #     |A2W;AUDIO;BLU-RAY   |
      #  And Fill Associate Fields in a "New Account: Business Customer - CS" record details form
        #|Distribution Channel   |Division        |
        #|PSV Sales. Org         |PSV Sales. Org  |  
      #  |Distribution Channel   |
      #  |PSV Sales. Org         |

        And I click "Save" button
        And I close success alert with text "was created"
        And I click "Details" tab on record details
        Then  I am in "Details" tab
        And  Verify record details
        |Account Name   |Type       |Industry        |Ownership|
        |Automation     |Prospect   |Banking         |Public   |


    Scenario: Edit the account

        Given  I click edit button of field "Industry" on record details
        And Fill Picklist Fields in a record details form
        |SLA     |
        |Gold    |
        And Fill Normal Fields in a record details form
        |Billing Country  |Billing City |
        |Singapore        |Singapore    |  
        And I click "Save" button
  #      And Remove Selections from MultiValue Fields in a record details form
  #      |Regional category   |
  #      |A2W;AUDIO;BLU-RAY   |
  #      And Fill MultiValue Fields in a record details form
  #      |Regional category   |
  #      |AIO;CAC             |  
  #      And Fill Associate Fields in a record details form
  #      |Distribution Channel   |
  #      |PSV Sales. Org         |        
       # Then  I am in "Details" tab
    #     And  Verify record details
    #     |Account Name    |Type       |Industry        |Ownership|SLA   |Billing Country  |Billing City |
     #    |Automation TEST |Prospect   |Banking         |Public   |Gold  |Singapore        |Singapore    |   
      







