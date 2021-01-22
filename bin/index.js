#!/usr/bin/env node
const { refresh } = require("../lib/utils/interface");
const { displayMainOptions } = require("../lib/core/main");
const log = require("../lib/utils/log");

refresh();
displayMainOptions();
// log.success("Started with success");
