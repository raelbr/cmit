#!/usr/bin/env node
const { refresh } = require("../lib/utils/interface");
const { displayMainOptions } = require("../lib/core/main");

refresh();
displayMainOptions();
