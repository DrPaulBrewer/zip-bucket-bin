#!/usr/bin/env node

/* Copyright 2017-, 2023- Paul Brewer, Economic and Financial Technology Consulting LLC */
/* This file is open source software.  The MIT License applies to this software. */

/* jshint node:true,esnext:true,eqeqeq:true,undef:true,lastsemic:true */

const fs = require('fs');
const { Command } = require('commander');
// for storage API 2.x onward
const {Storage} = require('@google-cloud/storage');
const zipBucketFactory = require("zip-bucket");
const secureJSON = require('secure-json-parse');

const z = {};

let projectId, credentials, useJSON;

const program = new Command();
function setAPIKey(keyFilename) {
    try {
        const keyFileText = fs.readFileSync(keyFilename, {encoding: 'utf8'});
        const { projectId } = secureJSON.parse(keyFileText);
        credentials = {projectId, keyFilename};
    } catch(e){
        program.error('Error reading keyfile '+keyFilename+'--'+e);
    }
}

function enableJSON() {
    useJSON = true;
}

function enableProgressMessages() {
    z.progress = 1;
}

function setKeepPath(path) {
    z.keep = path;
}

function gsParse(path, bucketProperty, pathProperty) {
    const match = /gs:\/\/([^\/]+)\/*(.*)/.exec(path);
    if ((!match) || (match.length < 2)) return false;
    z[bucketProperty] = match[1];
    z[pathProperty] = match[2] || '';
    return true;
}

program
        .name('zip-bucket')
        .version('2.0.0')
        .argument('<fromBucketPath>', 'source gs://bucket/dir')
        .argument('[toBucketPath]', 'destination gs://bucket/dir')
        .option('--key <keyfile>', 'keyfile to access Google Cloud Storage API', setAPIKey)
        .option('--keep <keep>', 'path in local filesystem to keep a copy of the .zip file', setKeepPath)
        .option('--progress', 'show progress messages', enableProgressMessages)
        .option('--json', 'output parameters and manifest in json', enableJSON)
        .action(function (fromBucketPath, toBucketPath) {
            if (gsParse(fromBucketPath, 'fromBucket', 'fromPath')) {
                gsParse(toBucketPath, 'toBucket', 'toPath');
                const storage = new Storage(credentials);
                const zipBucket = zipBucketFactory(storage);
                zipBucket(z).then(
                    (status) => {
                        if (useJSON) console.log(JSON.stringify(status, null, 2));
                    }, (e) => (console.log(e))
                );
            }
        })
        .parse(process.argv)

