import React from 'react';

// Documentation for MailApp and HtmlService
// https://developers.google.com/apps-script/reference/mail/mail-app#sendEmail(Object)
// https://developers.google.com/apps-script/guides/html

/*
I've also seen people use spreadsheets to go through emails
https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app
*/

interface recipientList {
    list: string[];
}

function GetList() { // 

}

function AutoEmail() {
    var recipient = GetList();
    var subject;

    // replace with actual template file
    var emailbody = HtmlService.createHtmlOutputFromFile('htmlFile').getContent(); 

    // shows all email recipients need to fix, for loop to prevent it for now
    // noReply requires Google workspace account
    for(int i = 0; i < arrayamount; i++) {
        GmailApp.sendEmail(recipient[i], subject, emailbody, {htmlBody: emailbody, noReply: true});
    }
}