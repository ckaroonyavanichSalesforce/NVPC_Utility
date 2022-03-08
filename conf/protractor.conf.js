exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    framework: 'custom',
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args' : [/*"--headless",*/ "--window-size=3920,3080", "--no-sandbox", "--disable-gpu", "--enable-features=NetworkService", "--incognito"],
            'prefs' : 
            {
                'profile.managed_default_content_settings.geolocation': 2,
                'profile.managed_default_content_settings.notifications': 1
            }
        }
    },
  
    // Spec patterns are relative to this directory.
    specs: [
      '../features/Login.feature',
      '../features/Accounts.feature'
    ],
  
    baseURL: 'http://localhost:8080/',
  
    cucumberOpts: {
      require: '../build/**/*.js',
      format: 'json:../result/result.json'
    },

    onPrepare: async function() {
        await browser.waitForAngularEnabled(false);
    }
  };