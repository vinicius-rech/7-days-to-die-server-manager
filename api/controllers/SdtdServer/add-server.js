module.exports = {


  friendlyName: 'Add server',


  description: '',


  inputs: {

    serverIp: {
      description: 'Ip of the SdtdServer',
      type: 'string',
      required: true
    },

    telnetPort: {
      type: 'number',
      required: true
    },

    webPort: {
      type: 'number',
      required: true,
    },

    telnetPassword: {
      type: 'string',
      required: true,
    }

  },


  exits: {

    success: {
    },

    notLoggedIn: {
      responseType: 'badRequest',
      description: 'User is not logged in (check signedCookies)'
    }

  },

  /**
   * @memberof SdtdServer
   * @description Add a server to the system
   * @param {string} serverip Ip of the server to add
   * @param {number} telnetport Telnet port of the server
   * @param {string} telnetpassword Telnet password of the server
   * @param {number} webport Port for webserver added by Alloc's fixes
   */

  fn: async function (inputs, exits) {

    sails.log.info(`API - SdtdServer:addServer - Adding a new server ${inputs.serverIp} ${inputs.webPort}`);

    if (_.isUndefined(this.req.signedCookies.userProfile)) {
      throw 'notLoggedIn';
    }

    try {
      const userProfile = this.req.signedCookies.userProfile;
      let sdtdServer = await sails.helpers.add7DtdServer.with({
        ip: inputs.serverIp,
        telnetPort: inputs.telnetPort,
        telnetPassword: inputs.telnetPassword,
        webPort: inputs.webPort,
        owner: userProfile.id
      });
      return exits.success(sdtdServer);
    } catch (error) {
      sails.log.error(`API - addServer - ${error}`);
      throw {
        error: error
      };
    }



  }


};
