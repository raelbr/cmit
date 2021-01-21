#!/usr/bin/env node
const { refresh } = require("../lib/utils/interface");
const log = require("../lib/utils/log");

refresh();
log.success("Started with success");
