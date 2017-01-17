'use strict';

/**
 * Push notification endpoints handlers
 */
const Promise = require('bluebird');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const csv = require('csvtojson');
const models = require('../../models');
const Employee = models['employee'];
const Expense = models['expense'];

/**
 * Insert Expense and Employee Record on the database
 * @param  {[object]}   jsonObj - Expense Record  
 * @return  {Promise} 
 */
const insertRecord = jsonObj => {
  return Promise.resolve().then(() => {
    const nameId = jsonObj['employeename'].replace(/[^A-Z0-9]/ig, "");
    //Using name Identifier as the name without spaces(Supposition)
    return Employee.findOne({ 
      where: {
        nameIdentifier: nameId.toLowerCase()
      }
    });
  })      
  .then(employee => {
    if (employee) {
      return Promise.resolve(employee);
    }
    
    return Employee.create({
      nameIdentifier: (jsonObj['employeename'].replace(/[^A-Z0-9]/ig, "")).toLowerCase(),
      employeename: jsonObj['employeename'],
      employeeaddress: jsonObj['employeeaddress']
    })
  })
  .then(employee => {
    
    return Expense.create({
      employeeId: employee.get('id'),
      date: new Date(jsonObj['date']),
      expensedescription: jsonObj['expensedescription'],
      category: jsonObj['category'],
      pretaxamount: jsonObj['pretaxamount'],
      taxamount: jsonObj['taxamount'],
      taxname: jsonObj['taxname']            
    });

  })
  .then(expense => {

    return Promise.resolve(expense);
  })
  .catch(err => {

    return Promise.reject(err);
  })

}

/**
 * POST /upload
 * @param  {[object]}   req  [req.body contains POST arguments]
 * @param  {[object]}   res
 * @param  {Function} next [description]
 */
const upload = (req, res, next) => {
  
  // create an incoming form object
  const form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../../uploads');

  let newPath;
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    newPath = path.join(form.uploadDir, file.name);
    fs.renameSync(file.path, newPath);
  });

  // log any errors that occur
  form.on('error', function(err) {
  	throw err;
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {

    const records = [];
    csv()
    .fromFile(newPath)
    .on('json',(jsonObj)=>{
       
        // Adding properties without space and special characters to json
        for (let key in jsonObj) {
          if (key.indexOf(' ') >= 0 || /^[a-zA-Z0-9- ]*$/.test(key)){
            const newKey = key.replace(/[^A-Z0-9]/ig, "");
            jsonObj[newKey] = jsonObj[key];
            
          }
        }

        records.push(jsonObj);
    })
    .on('done',(error)=>{
				
				return Promise.each(records, function(record){
          return insertRecord(record);
        })
        .then( result => {
          
          res.send(result);
          return next();
        })
    });

  });
  // parse the incoming request containing the form data
  form.parse(req);

}

module.exports = {
  upload: upload
};
