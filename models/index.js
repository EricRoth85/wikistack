var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const User = db.define('user', {
  id: { type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  },
  name: { type: Sequelize.STRING,
    allowNull: false,
  },
  email: { type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
});


const Page = db.define('page', {
  title: { type: Sequelize.STRING,
    allowNull: false
  },
  id: { type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  urlTitle: { type: Sequelize.STRING,
    allowNull: false,
  },
  content: { type: Sequelize.STRING,
    allowNull: false
  },
  status: { type: Sequelize.ENUM('open', 'closed')
  },
  date: { type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  getterMethods: {
    urlTitle() {
      // let title = this.getDataValue('title');
      return "/wiki/" + this.urlTitle;
    }
  },


    hooks: {
    beforeValidate: (page, options) => {
      let pageTitle;
      if(page) {
        page.urlTitle = page.title.toLowerCase().split(' ').join('_');

      } else {
        page.urlTitle = Math.random().toString(36).substring(2, 7);
      }

    }
  }
});


module.exports = {
  db: db,
  Page: Page,
  User: User
};
