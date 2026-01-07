const { AllureRuntime } = require('allure-js-commons');

const runtime = new AllureRuntime({ resultsDir: 'allure-results' });

global.allureRuntime = runtime;
