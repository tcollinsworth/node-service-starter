module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      "semi": [2, 'never'],
      "import/no-extraneous-dependencies": ['error', { devDependencies: true }],
      "max-len": "off",
      "import/prefer-default-export" : "off",
      "no-use-before-define": "off",
      "no-multi-str": "off",
      "no-plusplus": "off",
      "no-param-reassign": "off",
      "no-underscore-dangle": "off",
      "no-return-assign": "off",
    }
};
