#!/usr/bin/env node
var figlet = require('figlet');
var clear = require('clear');
var chalk  = require('chalk');
var generate = require('csv-generate');
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
var dt = new Date();
//var year = dt.getFullYear();
//ar month = dt.getMonth();

clear();
console.log(
  chalk.blue(
    figlet.textSync('Costoku', { horizontalLayout: 'full' })
  )
);

/*
Get invoices from devops account
for  month previous to flags
N.B - this should probably return 0 as of Oct 2017
*/
heroku.get('/apps').then(invoices => {
  invoices.forEach(function(invoice) {
    if (invoice.period_end == endDate) {
    }
  });
})

/*
Pass in --month 11 --year 2017
the first day of the next month will get the previous
month's invoice
*/
//var argv = require('minimist')(process.argv.slice(2));
var endDate = "2018-01-01"

/*
Since the platform api seems to return orgs in a random sorting 
each time, create an array to hold values until they can be sorted
alphabetically
*/
var returnedArray = new Array(2);

/*
Loop through organizations, for each org name
then loop through the invoices
*/
heroku.get('/organizations').then(orgs => {
  orgs.forEach(function(org) {
    console.log(orgs);
    heroku.get(`/organizations/${org.name}/invoices`).then(invoice => {
      invoices.forEach(function(invoice) {
        if (invoice.period_end == endDate) {
          //add decimal 2 places to the left of the end of the 'total' string
          output =  (invoice.total / 100).toFixed(2);
          returnedArray.push([org.name,output])
          returnedArray.sort();
          returnedArray.toString();
          
          console.log("inv tot:" + invoice.total);
          console.log(returnedArray)
        }
      })
    })
  })
});
  
