const { Collection } = require('discord.js');

// Local imports
const config = require('../config.js');
const emojis = require('./config/emojis');
const colors = require('./config/colors');

// Building collections
const Commands = new Collection();
const ContextMenus = new Collection();
const Buttons = new Collection();
const Modals = new Collection();
const AutoCompletes = new Collection();
const SelectMenus = new Collection();

/**
 * @typedef {Object} ClientConfigPresence
 * @property {Discord.PresenceUpdateStatus} status The client's status (online, busy, dnd, offline)
 * @property {Array<ClientConfigPresenceActivity>} activities Array of client activities
 */

/**
 * @typedef {Object} ClientConfigPermissions
 * @property {string} ownerId The bot owners's Discord user id
 * @property {Array<string>} developers Array of Discord user id's representing active developers
 */

/**
 * @typedef {Object} ClientConfiguration
 * @property {Array<Discord.GatewayIntentBits>} intents Required gateway intents
 * @property {ClientConfigPresence} presence Client presence configuration
 * @property {ClientConfigPermissions} permissions Internal permission configuration
 * @property {string} supportServerInviteLink The link to the Discord server where bot support is offered
 */

/**
 * @typedef {Object} ClientEmojiConfiguration
 * @property {string} success Emoji prefix that indicates a successful operation/action
 * @property {string} error Emoji prefix that indicates something went wrong
 * @property {string} wait Emojis prefix that indicates the client is processing
 * @property {string} info Emoji prefix that indicates a general tip
 * @property {string} separator Emoji prefix used as a separator
 */

/**
 * @typedef {Object} ClientColorConfiguration
 * @property {string} main The main color/primary color. Used in most embeds.
 * @property {string} invisible The color that appears invisible in Discord dark mode
 * @property {string} success The color used in embeds that display a success message
 * @property {string} error The color used in embeds that display an error
 */

/**
 * @typedef {Object} ClientContainer
 * @property {ClientConfiguration} config The discord client configuration
 * @property {ClientEmojiConfiguration} emojis An object with defined emoji keys
 * @property {ClientColorConfiguration} colors An object with defined color keys
 * @property {Collection<string, ChatInputCommand>} commands Chat Input commands
 * @property {Collection<string, UserContextCommand | MessageContextCommand>} contextMenus Context Menu commands
 * @property {Collection<string, ComponentCommand>} buttons Button commands
 * @property {Collection<string, ComponentCommand>} modals Modal commands
 * @property {Collection<string, ComponentCommand>} autoCompletes Autocomplete commands
 * @property {Collection<string, ComponentCommand>} selectMenus Select Menu commands
 */

/**
 * @type {ClientContainer}
 */
module.exports = {
  // Config
  config,
  emojis,
  colors,

  // Collections
  commands: Commands,
  contextMenus: ContextMenus,
  buttons: Buttons,
  modals: Modals,
  autoCompletes: AutoCompletes,
  selectMenus: SelectMenus
};
