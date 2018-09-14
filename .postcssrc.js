// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {},
    "postcss-px2rem": {
      baseDpr: 2,             // base device pixel ratio (default: 2)
      threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
      remVersion: true,       // whether to generate rem version (default: true)
      remUnit: 37.5,            // rem unit value (default: 75)
      remPrecision: 6         // rem precision (default: 6)
    }
    //由于部分手机原生浏览器对VM适配方案不支持，所以暂时搁置这个方案
    // "postcss-px-to-viewport": {
    //   viewportWidth: 375,
    //   viewportHeight: 667,
    //   unitPrecision: 5,
    //   viewportUnit: "vw",
    //   selectorBlackList: [],
    //   minPixelValue: 1,
    //   mediaQuery: false
    // }
  }
};
