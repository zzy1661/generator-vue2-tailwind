var Generator = require('yeoman-generator');
var yosay = require('yosay');
const commandExists = require('command-exists').sync;
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("appname", { type: String, required: false });
  }
  // - Your initialization methods (checking current project state, getting configs, etc)
  async initializing() {
    this.log(yosay('Welcome to the vue2-tailwind generator'));
  }
  // - Where you prompt users for options (where you’d call this.prompt())
  async prompting() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.options.appname // Default to current folder name
      },
      {
        type: "confirm",
        name: "tailwind", store: true,
        message: "Would you like to enable the tailwind?"
      },{
        type:"list",
        name: 'platform',
        message: 'choose a platform',
        choices:['pc','h5']
      }
    ])
    this.answers = answers;
  
    this.destinationRoot('./' + this.answers.name)
    this.env.cwd = this.destinationRoot()
  }
 
  writing() {
    this.fs.copyTpl(this.templatePath('vue2/**/*'),this.destinationPath(),this.answers,{},{processDestinationPath:(destinationFile)=>{
      if(destinationFile.includes('tailwind')){
        return destinationFile.replace(/(\/|\\)(_no_tailwind)|(_tailwind)/,'');
      } else {
        return destinationFile;
      }
    },globOptions:{dot:true,ignore:[this.answers.tailwind?'**/_no_tailwind/**':'**/_tailwind/**']}})
    this.spawnCommand('git','init')
    const pkgJson = {
      "name": this.answers.name || '',
      "version": "0.0.1",
      "private": true,
      "scripts": {
        "prod": "vue-cli-service build && rm -rf dist/static/js/*.js.map",
        "build:stage": "vue-cli-service build --mode staging",
        "genlog": "conventional-changelog -p angular -i .github/CHANGELOG.md -s",
        "git-cz": "git add . && npx git-cz",
        "lint": "vue-cli-service lint",
        "lint:style": "stylelint src/**/*.{css,scss,sass,vue}",
        "serve": "vue-cli-service serve",
        "dev": "yarn serve",
      },
      "husky": {
        "hooks": {
          "pre-commit": "lint-staged",
          "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
      },
      "commitlint": {
        "extends": [
          "@commitlint/config-conventional"
        ]
      },
      "lint-staged": {
        "*.{js,jsx,ts,tsx,vue}": [
          "eslint --ext .js,.jsx,.ts,.tsx,.vue --fix",
          "git add"
        ]
      },
      "config": {
        "commitizen": {
          "path": "cz-conventional-changelog"
        }
      },
      "browserslist": [
        "> 1%",
        "ie >= 8",
        "edge >= 15",
        "ie_mob >= 10",
        "ff >= 45",
        "chrome >= 45",
        "safari >= 7",
        "opera >= 23",
        "ios >= 7",
        "android >= 4",
        "bb >= 10"
      ],
      "dependencies": {
        "async-validator": "^3.5.1",
        "autoprefixer": "^9",
        "axios": "^0.21.1",
        "core-js": "^3.6.4",
        "postcss": "^7",
        "vant": "^2.12.6",
        "vue": "^2.6.12",
        "vue-i18n": "^8.15.4",
        "vue-router": "^3.5.1",
        "vuex": "^3.6.2",
        "js-cookie": "^3.0.1"
      },
      "devDependencies": {
        "@babel/parser": "^7.14.8",
        "@commitlint/cli": "^8.3.5",
        "@commitlint/config-conventional": "^8.3.4",
        "@vue/cli-plugin-babel": "^4.2.0",
        "@vue/cli-plugin-eslint": "^4.2.0",
        "@vue/cli-plugin-router": "^4.2.0",
        "@vue/cli-plugin-unit-mocha": "^4.2.0",
        "@vue/cli-plugin-vuex": "^4.2.0",
        "@vue/cli-service": "^4.2.0",
        "@vue/eslint-config-prettier": "^6.0.0",
        "babel-eslint": "^10.0.3",
        "babel-plugin-import": "^1.13.3",
        "babel-plugin-try-catch-error-report": "^0.1.0",
        "commitizen": "^4.2.3",
        "conventional-changelog": "^3.1.24",
        "copy-webpack-plugin": "^6.3.2",
        "cz-conventional-changelog": "^3.3.0",
        "eslint": "^6.7.2",
        "eslint-plugin-prettier": "^3.1.1",
        "eslint-plugin-vue": "^6.1.2",
        "husky": "^4.3.0",
        "less": "4.1.0",
        "less-loader": "7.3.0",
        "lint-staged": "^10.5.1",
        "lodash-webpack-plugin": "^0.11.5",
        "plop": "^2.7.4",
        "prettier": "^1.19.1",
        "sass": "^1.25.0",
        "sass-loader": "^8.0.2",
        "script-ext-html-webpack-plugin": "^2.1.4",
        "style-resources-loader": "^1.3.3",
        "stylelint": "^13.13.1",
        "stylelint-config-prettier": "^8.0.2",
        "stylelint-config-standard": "^22.0.0",
        "stylelint-scss": "^3.20.1",
        "svg-sprite-loader": "^4.2.1",
        "uglifyjs-webpack-plugin": "^2.2.0",
        "vue-cli-plugin-style-resources-loader": "^0.1.4",
        "vue-template-compiler": "^2.6.11"
      }
    };
    if (this.answers.tailwind) {
      Object.assign( pkgJson.devDependencies,{
        "@tailwindcss/postcss7-compat": "^2.2.7",
        "tailwindcss": "npm:@tailwindcss/postcss7-compat",
      })
    }
    if(this.answers.platform==='h5') {
      Object.assign( pkgJson.devDependencies,{
        "postcss-pxtorem": "^5.1.1"
      })
    }

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
   
  }
 // The installation will automatically run during the run loop `install` phase.
 // https://github.com/yeoman/generator/issues/1294
 // 设置this.env.options.nodePackageManager = 'yarn';
   install() {
    const git = this.spawnCommandSync('git',['init'])
    if(git.exitCode!==0){
      this.log(git.stdout)
    }
    if(commandExists('yarn')) {
      this.env.options.nodePackageManager = 'yarn';
    } 
    
  }
  end() {
    const start = this.spawnCommandSync('yarn',['serve'])
    if(start.exitCode!==0){
      this.log(start.stdout)
    }
  }
  
};