const report = require('multiple-cucumber-html-reporter');
report.generate({
    //for manual run change to
    //jsonDir: 'cypress/cucumber-json/',
	jsonDir: 'Maritech.CPM/Maritech.CPM.Ui.Cypress/cypress/cucumber-json/',
	reportPath: './reports/cucumber-html-report.html',
	metadata:{
        browser: {
            name: 'Chrome',
            version: '91'
        },
        device: 'Agent machine',
        platform: {
            name: 'Windows 10 Enterprise',
            version: '19043.1052'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Custom project'},
            {label: 'Release', value: '1.2.3'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: ("0" + new Date().getDate()).slice(-2) + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" +  new Date().getFullYear() + " " + ("0" + new Date().getHours() + 1 ).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2) + ":" + ("0" + new Date().getSeconds()).slice(-2)}
        ]
    }
});
