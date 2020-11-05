export const emailService = {
  query,
  remove,
  getById,
  getSentEmail

}

var emails = [{
    id: 'XYz6781j',
    recipient: "Admin",
    from: "Charli Yuda",
    fromEmail: 'charly@appsus.com',
    subject: 'Wassap?',
    body: 'Pick up!',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6782j',
    recipient: "Admin",
    from: "Bobi Meggi",
    fromEmail: 'bobi@appsus.com',
    subject: 'How are you?',
    body: 'how is with everyone?',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6783j',
    recipient: "Admin",
    from: "Popo Ben Mosh",
    fromEmail: 'popo@appsus.com',
    subject: 'I am missing you',
    body: 'lets go to the mall',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6784j',
    recipient: "Admin",
    from: "Charles Henry",
    fromEmail: 'charle@appsus.com',
    subject: 'Can i see you today?',
    body: 'I am missing you me friend',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6785j',
    recipient: "Admin",
    from: "Ben Ben",
    fromEmail: 'ben@appsus.com',
    subject: 'List of tasks?',
    body: 'wash dishes, clean home',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6786j',
    recipient: "Admin",
    from: "Yoni Geva",
    fromEmail: 'yoni@appsus.com',
    subject: 'today meeting',
    body: 'meeting with Caroline',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6787j',
    recipient: "Admin",
    from: "Gal Goni",
    fromEmail: 'gal@appsus.com',
    subject: 'Next weeks events',
    body: 'cooking classes',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6788j',
    recipient: "Admin",
    from: "Matan Noria",
    fromEmail: 'matan@appsus.com',
    subject: 'Whatsapp promotions',
    body: 'check it out',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6780j',
    recipient: "Admin",
    from: "Samir Shukri",
    fromEmail: 'samir@appsus.com',
    subject: 'Time for some fresh air?',
    body: '	Need a break from the crowds?',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6787j',
    recipient: "Admin",
    from: "Gal Goni",
    fromEmail: 'gal@appsus.com',
    subject: 'Next weeks events',
    body: 'cooking classes',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6788j',
    recipient: "Admin",
    from: "Matan Noria",
    fromEmail: 'matan@appsus.com',
    subject: 'Whatsapp promotions',
    body: 'check it out',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  },
  {
    id: 'XYz6780j',
    recipient: "Admin",
    from: "Samir Shukri",
    fromEmail: 'samir@appsus.com',
    subject: 'Time for some fresh air?',
    body: '	Need a break from the crowds?',
    isRead: false,
    sentAt: 1551133930594,
    isChecked: false,
    isStarred: false
  }

]

var removedEmails = []

window.theRemovedEmails = removedEmails;

var sentEmails = []
window.theSentEmails = sentEmails;


window.theEmails = emails;
const KEY = 'emails'

function query() {
  const emailsFromStorage = loadFromStorage(KEY)
  if (emailsFromStorage) emails = emailsFromStorage
  return Promise.resolve(emails)
}



function remove(emailId, emailToRemove) {
  removedEmails.push(emailToRemove)
  emails = emails.filter(email => email.id !== emailId);
  _saveEmailsToStorage()
}

function getById(emailId) {
  let email = emails.find(email => email.id === emailId)
  if (!email) email = removedEmails.find(email => email.id === emailId);
  if (!email) email = sentEmails.find(email => email.id === emailId);
  return Promise.resolve(email)
}

function getSentEmail(recipients, subject, body) {
  const sentEmail = {
    id: makeId(),
    recipient: recipients,
    from: "Admin",
    fromEmail: 'admin@appsus.com',
    subject: subject,
    body: body,
    isRead: false,
    sentAt: Date.now(),
    isChecked: false,
    isStarred: false
  };
  sentEmails.push(sentEmail)
  return sentEmail
}


function _saveEmailsToStorage() {
  saveToStorage(KEY, emails)
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

function makeId(length = 8) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}