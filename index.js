/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const SeeCounterStrike = require('see-counter-strike');

const APP_ID = 'amzn1.ask.skill.SKILL_ID_HERE';

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetRandomCounterStrikeWeapon');
  },
  'GetRandomCounterStrikeWeapon': function() {
    const scs = new SeeCounterStrike();
    const randomWeapon = scs.getRandomWeapon();
    const speechOutput = `Your random Counter-Strike weapon is: ${randomWeapon.name}. The category of this weapon is: ${randomWeapon.category}`;
    this.emit(
      ':tellWithCard',
      speechOutput,
      'Random Counter-Strike Weapons',
      `Weapon name: ${randomWeapon.name}. Category: ${randomWeapon.category}`
    );
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = 'This skill tells you a random Counter-Strike weapon. Would you like to hear one?';
    this.emit(':ask', speechOutput, speechOutput);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.YesIntent': function() {
    this.emit('GetRandomCounterStrikeWeapon');
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};
